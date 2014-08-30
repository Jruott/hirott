## Android Push SDK 

### Getting Started
This document tells you how to get started setting up a Push implementation.
### Creating a Push API project
---
To create a Push API project:

1. Open the [push Console](http://115.29.28.117).
2. If you haven't created an API project yet, click Create Project.
3. Supply a project name and click Create.Once the project has been created, you can get app key at detail page. For example, Project Number: 670330094152.
4. Copy down your app key. You will use it later on as the Push app key .

### Implementing Push Client

The following sections walk you through the steps involved in writing a Push client-side application

#### Step 1: Get Push SDK
---
- Open the [AndroidPushSDK](http://115.29.28.117/lovecluo/androidpushsdk), download the source code.
- Import the push sdk as the android project.

>Android push SDK has some useful api, it can easy create connection to server.

#### Step 2: Create Push Client Application
---
- Open eclipse, and create android project as usual.
- Add AndroidPushSDK as library.

![mahua](upload/add_library.png)

#### Step 3: Edit Your Application's Manifest
---
Add the following to your application's manifest:

- ~~The `org.nightweaver.push.permission.RECEIVE` permission so the Android application can register and receive messages.~~
- The `android.permission.INTERNET` permission so the Android application can send the register to the push server.
- A receiver for `org.nightweaver.push.recive.message`, `org.nightweaver.push.send.message`,`org.nightweaver.push.connecte`.
- A Service (`org.nightweaver.push.smack.XMPPService`) to which the WakefulBroadcastReceiver passes off the work of handling the Push message, while ensuring that the device does not go back to sleep in the process. Including an IntentService is optional—you could choose to process your messages in a regular BroadcastReceiver instead, but realistically, most apps will use it.

**Here are excerpts from a sample manifest that supports Push:**

xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.nightweaver.pushdemo"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="14"
        android:targetSdkVersion="19" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launch"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name="org.nightweaver.pushdemo.MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <service android:name="org.nightweaver.push.smack.XMPPService" >
        </service>
        <receiver android:name="org.nightweaver.pushdemo.PushMessageRecever" >
            <intent-filter>
                <action android:name="org.nightweaver.push.recive.message" />
                <action android:name="org.nightweaver.push.send.message" />
                <action android:name="org.nightweaver.push.connecte" />
            </intent-filter>
        </receiver>
    </application>

</manifest>

#### Step 4: Regist Push Application
---
We should regist push application at frist.In the sample app this check is done in two places: 
in the main activity's onCreate() method, and in its onResume() method. 
The check in onCreate() ensures that the app can't be used without a successful check. 
The check in onResume() ensures that if the user returns to the running app through some other means, s
uch as through the back button, the check is still performed. 
For example:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Push push = Push.getInstance(this);
    push.regist(app_key, new LoginCallBack() {
        @Override
        public void onStateChanged(int state, String reason) {
            Log.d(TAG, "state:" + state + " reason:" + reason);
        }
    });
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Push push = Push.getInstance(this);
        push.unBind();
    }
    
}
```
#### Step 5: Recive Message
---
For example:
```java
package org.nightweaver.pushdemo;

import org.nightweaver.push.model.PushMessage;
import org.nightweaver.push.tools.PushConstantValue;
import org.nightweaver.push.tools.PushMessageTools;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;

public class PushMessageRecever extends BroadcastReceiver {

    private final  String TAG = PushMessageRecever.class.getSimpleName();
    @Override
    public void onReceive(Context context, Intent intent) {
        String actionName = intent.getAction();
        Log.d(TAG, "action:" + actionName);
        if (actionName.equals(PushConstantValue.RECIVE_MESSAGW_ACTION)) {
            String msgXML = intent.getExtras().getString(PushConstantValue.KEY_XML_MESSAGW);
            Log.d(TAG, "reciver Message :" + msgXML);
            PushMessage message = new PushMessage(msgXML);
            PushMessageTools.showDefault(context, message, MainActivity.class);
        }
    }

}
```