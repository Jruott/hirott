/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50529
Source Host           : localhost:3306
Source Database       : hirott

Target Server Type    : MYSQL
Target Server Version : 50529
File Encoding         : 65001

Date: 2014-07-24 19:32:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `logintime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'jruott', '1111', 'Jruott', 'jruott@qq.com', '2014-07-12 19:59:17', '2014-07-24 19:14:15');

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(512) NOT NULL,
  `type` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '0',
  `tags` varchar(512) DEFAULT NULL,
  `preview` varchar(512) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `scategory` int(11) DEFAULT NULL,
  `content` varchar(512) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `modifytime` tinyblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', 'hello', '0', '1', null, '81edb6a0-1318-11e4-95b6-fba493baa509', 'Hello World!\r\n\r\nThis is a test page. \r\n\r\nthis is a describe\r\n\r\ndescrition\r\n\r\n1. abc\r\n2. qwe\r\n3. asd\r\n', null, 'hello.md', '2014-07-02 06:11:55', null);

-- ----------------------------
-- Table structure for attachment
-- ----------------------------
DROP TABLE IF EXISTS `attachment`;
CREATE TABLE `attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `link` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `uploader` int(11) DEFAULT NULL,
  `uploadtime` datetime DEFAULT NULL,
  `owner` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of attachment
-- ----------------------------
INSERT INTO `attachment` VALUES ('5', 'IMG_20140720_170525.jpg', '460adc90-1317-11e4-9160-0f2f70a93f15', '', '1', '2014-07-24 17:45:40', '1');
INSERT INTO `attachment` VALUES ('8', '61e8a1fdtw1egsqxmz0vdg209q06lqu1.gif', '3eba5820-1318-11e4-9160-0f2f70a93f15', '', '1', '2014-07-24 17:52:38', '0');
INSERT INTO `attachment` VALUES ('9', '61e8a1fdtw1egsqxmz0vdg209q06lqu1.gif', '81edb6a0-1318-11e4-95b6-fba493baa509', '', '1', '2014-07-24 17:54:30', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `logintime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
