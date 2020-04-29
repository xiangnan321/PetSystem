/*
Navicat MySQL Data Transfer

Source Server         : jg445.zxn
Source Server Version : 50537
Source Host           : 127.0.0.1:3306
Source Database       : petsystem

Target Server Type    : MYSQL
Target Server Version : 50537
File Encoding         : 65001

Date: 2020-04-27 14:23:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_address
-- ----------------------------
DROP TABLE IF EXISTS `t_address`;
CREATE TABLE `t_address` (
  `add_id` int(11) NOT NULL AUTO_INCREMENT,
  `add_phone` varchar(255) DEFAULT NULL,
  `add_address` varchar(255) DEFAULT NULL,
  `add_name` varchar(255) DEFAULT NULL,
  `fk_users_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`add_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_address
-- ----------------------------
INSERT INTO `t_address` VALUES ('1', '13543245432', '额AV支付宝沈杜公路', '章子', '1');
INSERT INTO `t_address` VALUES ('2', '13551478296', '四川省达州市渠县', '邹向南', '11');
INSERT INTO `t_address` VALUES ('3', '13551478296', '四川省成都市武侯区', '邹向南', '11');

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `adm_id` int(11) NOT NULL AUTO_INCREMENT,
  `adm_name` varchar(255) DEFAULT NULL,
  `adm_age` varchar(255) DEFAULT NULL,
  `adm_gender` varchar(255) DEFAULT NULL,
  `adm_phone` varchar(255) DEFAULT NULL,
  `adm_account` varchar(255) DEFAULT NULL,
  `adm_pwd` varchar(255) DEFAULT NULL,
  `adm_isSuperAdmin` int(11) DEFAULT NULL,
  PRIMARY KEY (`adm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES ('1', '邹向南', '19', '男', '13551478296', 'admin', 'admin', '1');
INSERT INTO `t_admin` VALUES ('2', 'zouxiangnan', '19', '男', '13551478296', '12345', '12345', '0');

-- ----------------------------
-- Table structure for t_apply
-- ----------------------------
DROP TABLE IF EXISTS `t_apply`;
CREATE TABLE `t_apply` (
  `app_id` int(11) NOT NULL AUTO_INCREMENT,
  `app_time` datetime DEFAULT NULL,
  `app_type` int(11) DEFAULT NULL,
  `app_status` int(11) DEFAULT NULL,
  `fk_bus_id` int(11) DEFAULT NULL,
  `fk_shop_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_apply
-- ----------------------------
INSERT INTO `t_apply` VALUES ('1', '2019-10-01 22:31:26', '1', '2', '1', null);
INSERT INTO `t_apply` VALUES ('2', '2019-08-27 22:32:37', '2', '2', null, '1');
INSERT INTO `t_apply` VALUES ('3', '2019-11-20 22:33:35', '2', '2', null, '2');
INSERT INTO `t_apply` VALUES ('4', '2020-03-14 00:20:17', '2', '2', null, '3');
INSERT INTO `t_apply` VALUES ('8', '2020-03-14 11:19:42', '2', '2', null, '2');
INSERT INTO `t_apply` VALUES ('10', '2020-03-14 11:48:18', '2', '2', null, '9');
INSERT INTO `t_apply` VALUES ('17', '2020-03-23 11:45:56', '2', '2', null, '6');
INSERT INTO `t_apply` VALUES ('18', '2020-02-12 11:46:05', '2', '2', null, '5');
INSERT INTO `t_apply` VALUES ('19', '2020-03-23 13:40:06', '2', '2', '13', null);
INSERT INTO `t_apply` VALUES ('20', '2020-03-23 14:11:33', '1', '2', '15', null);
INSERT INTO `t_apply` VALUES ('22', '2020-03-23 14:19:35', '1', '3', '17', null);
INSERT INTO `t_apply` VALUES ('23', '2020-04-27 13:14:13', '1', '3', '19', null);
INSERT INTO `t_apply` VALUES ('24', '2020-04-27 13:14:37', '3', '1', null, '2');
INSERT INTO `t_apply` VALUES ('25', '2020-04-27 13:15:17', '3', '1', null, '9');

-- ----------------------------
-- Table structure for t_business
-- ----------------------------
DROP TABLE IF EXISTS `t_business`;
CREATE TABLE `t_business` (
  `bus_id` int(11) NOT NULL AUTO_INCREMENT,
  `bus_name` varchar(255) DEFAULT NULL,
  `bus_age` int(11) DEFAULT NULL,
  `bus_gender` varchar(255) DEFAULT NULL,
  `bus_account` varchar(255) DEFAULT NULL,
  `bus_pwd` varchar(255) DEFAULT NULL,
  `bus_phone` varchar(13) DEFAULT NULL,
  `bus_status` int(11) DEFAULT NULL,
  `fk_adm_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`bus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_business
-- ----------------------------
INSERT INTO `t_business` VALUES ('1', '小黄', '19', '男', '123', '123', '13512341234', '2', '2');
INSERT INTO `t_business` VALUES ('2', '小红', '18', '女', '321', '321', '13612341234', '2', '2');
INSERT INTO `t_business` VALUES ('3', 'sq', '22', '男', '54321', '54321', '13412341234', '2', '1');
INSERT INTO `t_business` VALUES ('6', 'zxn', '19', '男', '9876', '9876', '13545674756', '2', '2');
INSERT INTO `t_business` VALUES ('7', 'yy', '19', '男', '34567', '34567', '13412341234', '2', '2');
INSERT INTO `t_business` VALUES ('8', 'th', '19', '女', '234567', '234567', '13443214321', '2', '2');
INSERT INTO `t_business` VALUES ('9', 'lzl', '20', '女', '2341', '2341', '13423344556', '2', '2');
INSERT INTO `t_business` VALUES ('10', 'tyl', '20', '女', 'qwer', 'qwer', '13523453456', '2', '2');
INSERT INTO `t_business` VALUES ('11', 'tcj', '20', '女', 'asdf', 'asdf', '13434566789', '2', '2');
INSERT INTO `t_business` VALUES ('12', 'tmj', '20', '女', 'zxcv', 'zxcv', '13445677890', '2', '2');
INSERT INTO `t_business` VALUES ('13', '我去', '22', '男', 'qaz', 'qaz', '13424545678', '2', '1');
INSERT INTO `t_business` VALUES ('15', 'qw', '23', '女', 'wsx', 'wsx', '13232323232', '2', '1');
INSERT INTO `t_business` VALUES ('16', 'we', '22', '女', 'edc', 'edc', '13234567890', '2', '1');
INSERT INTO `t_business` VALUES ('17', 'ww', '28', '男', 'rfv', 'rfv', '13443434343', '3', null);
INSERT INTO `t_business` VALUES ('19', 'zzz', '22', '男', '222', '222', '13434343434', '3', null);

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `good_id` int(11) NOT NULL AUTO_INCREMENT,
  `good_name` varchar(255) DEFAULT NULL,
  `good_cassify` varchar(255) DEFAULT NULL,
  `good_pet` varchar(255) DEFAULT NULL,
  `good_price` decimal(10,3) DEFAULT NULL,
  `good_weight` varchar(255) DEFAULT NULL,
  `good_production` date DEFAULT NULL,
  `good_shelfLife` varchar(255) DEFAULT NULL,
  `good_producer` varchar(255) DEFAULT NULL,
  `good_images` varchar(255) DEFAULT NULL,
  `good_desc` text,
  `good_sum` int(11) DEFAULT NULL,
  `fk_bus_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`good_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('1', '狗狗零食狗罐头宠物泰迪幼犬补钙食品小型犬狗湿粮金毛鸡胸肉拌饭', '爱宠零食', '狗', '56.800', '0.17kg', '2020-01-01', '6个月', '山东省潍坊市临朐县冶源镇', 'http://192.168.43.250:3000/images/u=1738641586,3873510318&fm=74&app=80&f=JPEG&size=f121,90.jpg', '营养的宠物食物', '20', '1');
INSERT INTO `t_goods` VALUES ('2', '宠物猫', '日常用品', '其他', '54.400', '0.3kg', '2019-09-01', '6个月', '阿萨法', 'http://192.168.43.250:3000/images/1646824.jpg', 'a阿嘎嘎', '24', '1');
INSERT INTO `t_goods` VALUES ('3', '狗咬胶', '日常用品', '狗', '45.300', '0.15kg', '2020-01-01', '24个月', '暗室逢灯', 'http://192.168.43.250:3000/images/u=68414270,3106368985&fm=26&gp=0.jpg', '爱上大V是否大V', '32', '1');
INSERT INTO `t_goods` VALUES ('4', '驱蚊器', '日常用品', '全部', '56.000', '0.13kg', '2020-02-23', '24个月', '广东省', 'http://192.168.43.250:3000/images/1584434918u=640287764,660980367&fm=26&gp=0.jpg', '案发生的给我了耳软骨大V拉拉呱顺利通过如果升龙天汇算大概TWSRG AFQ344 ', '54', '1');
INSERT INTO `t_goods` VALUES ('5', '狗粮', '爱宠主食', '狗', '299.000', '5kg', '2020-02-23', '6个月', '请问对方不的撒', 'http://192.168.43.250:3000/images/15844370481577028654910.jpg', '是大V十点半V领时候DVBO娱乐圣诞红包', '123', '1');
INSERT INTO `t_goods` VALUES ('9', '3乐文', '爱宠主食', '全部', '122.000', '12kg', '2020-03-02', '12个月', '色粉', 'http://192.168.43.250:3000/images/15846283841576160670454.png', '无非是', '22', '1');
INSERT INTO `t_goods` VALUES ('10', 'sdvafvsdw', '爱宠主食', '全部', '22.000', '22kg', '2020-04-20', '12个月', 'avf深V非丝非竹巴适得分为', 'http://192.168.43.250:3000/images/1586256039timg2.jpg', '啊啊士大夫GV从现在地方共和国', '12', '1');
INSERT INTO `t_goods` VALUES ('11', 'zfvfdfv', '爱宠主食', '全部', '22.000', '1kg', '2020-04-09', '12个月', 'asddsvdSd', 'http://192.168.43.250:3000/images/15879646771527770582-100049177-101337531.jpg', 'SvsDVSd深V', '22', '1');

-- ----------------------------
-- Table structure for t_goodsrun
-- ----------------------------
DROP TABLE IF EXISTS `t_goodsrun`;
CREATE TABLE `t_goodsrun` (
  `gR_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_shop_id` int(11) DEFAULT NULL,
  `fk_good_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`gR_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goodsrun
-- ----------------------------
INSERT INTO `t_goodsrun` VALUES ('3', '1', '3');
INSERT INTO `t_goodsrun` VALUES ('5', '1', '4');
INSERT INTO `t_goodsrun` VALUES ('6', '9', '4');
INSERT INTO `t_goodsrun` VALUES ('46', '1', '9');
INSERT INTO `t_goodsrun` VALUES ('47', '9', '9');
INSERT INTO `t_goodsrun` VALUES ('48', '2', '10');
INSERT INTO `t_goodsrun` VALUES ('49', '9', '10');
INSERT INTO `t_goodsrun` VALUES ('50', '2', '2');
INSERT INTO `t_goodsrun` VALUES ('51', '9', '2');
INSERT INTO `t_goodsrun` VALUES ('52', '2', '11');
INSERT INTO `t_goodsrun` VALUES ('53', '9', '11');
INSERT INTO `t_goodsrun` VALUES ('56', '1', '1');
INSERT INTO `t_goodsrun` VALUES ('57', '9', '1');
INSERT INTO `t_goodsrun` VALUES ('58', '2', '1');

-- ----------------------------
-- Table structure for t_ordergooder
-- ----------------------------
DROP TABLE IF EXISTS `t_ordergooder`;
CREATE TABLE `t_ordergooder` (
  `oG_id` int(11) NOT NULL AUTO_INCREMENT,
  `oG_time` datetime DEFAULT NULL,
  `oG_remarks` varchar(255) DEFAULT NULL,
  `oG_status` int(11) DEFAULT NULL,
  `oG_sum` int(11) DEFAULT NULL,
  `fk_add_id` int(11) DEFAULT NULL,
  `fk_good_id` int(11) DEFAULT NULL,
  `fk_bus_id` int(11) DEFAULT NULL,
  `fk_shop_id` int(11) DEFAULT NULL,
  `fk_users_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`oG_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_ordergooder
-- ----------------------------
INSERT INTO `t_ordergooder` VALUES ('1', '2020-03-28 16:05:19', '在深Vare我拉额额', '2', '1', '1', '2', '1', '2', '1');
INSERT INTO `t_ordergooder` VALUES ('2', '2020-04-13 18:15:58', '两室两厅绿光森林', '2', '1', '2', '2', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('5', '2020-04-13 21:36:51', '剩下的饭不想发布', '2', '1', '2', '3', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('6', '2020-04-13 22:10:22', '发给你才能充分', '2', '1', '2', '5', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('7', '2020-04-16 20:56:07', '', '2', '3', '3', '4', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('8', '2020-04-16 20:56:07', '', '3', '2', '3', '5', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('9', '2020-04-16 20:59:53', '', '2', '1', '3', '3', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('10', '2020-04-16 21:09:56', '', '3', '1', '3', '1', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('11', '2020-04-17 12:50:26', '', '2', '1', '3', '5', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('12', '2020-04-18 20:51:09', '', '3', '1', '2', '4', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('13', '2020-04-21 15:54:02', '', '2', '1', '2', '2', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('14', '2020-04-21 15:54:45', '', '2', '1', '3', '9', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('15', '2020-04-21 15:54:45', '', '3', '4', '3', '2', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('16', '2020-04-21 16:58:11', '', '2', '1', '3', '2', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('17', '2020-04-25 20:35:35', '', '2', '1', '3', '1', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('18', '2020-04-25 20:38:49', '', '1', '1', '3', '1', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('19', '2020-04-27 13:19:36', '', '3', '1', '3', '2', '1', null, '11');
INSERT INTO `t_ordergooder` VALUES ('20', '2020-04-27 13:20:44', '', '2', '2', '2', '9', '1', null, '11');

-- ----------------------------
-- Table structure for t_orderservices
-- ----------------------------
DROP TABLE IF EXISTS `t_orderservices`;
CREATE TABLE `t_orderservices` (
  `oS_id` int(11) NOT NULL AUTO_INCREMENT,
  `oS_time` date DEFAULT NULL,
  `oS_remarks` varchar(255) DEFAULT NULL,
  `oS_state` int(11) DEFAULT NULL,
  `oS_sum` int(11) DEFAULT NULL,
  `fk_add_id` int(11) DEFAULT NULL,
  `fk_ser_id` int(11) DEFAULT NULL,
  `fk_bus_id` int(11) DEFAULT NULL,
  `fk_shop_id` int(11) DEFAULT NULL,
  `fk_users_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`oS_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_orderservices
-- ----------------------------
INSERT INTO `t_orderservices` VALUES ('1', '2020-03-30', '阿尕大V而如果跟老公老公的风格', '2', '1', '1', '1', '1', '1', '1');
INSERT INTO `t_orderservices` VALUES ('4', '2020-04-20', '班车费飞洒', '1', '1', '3', '1', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('6', '2020-04-20', '', '1', '1', null, '1', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('7', '2020-04-20', '', '1', '1', null, '1', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('8', '2020-04-20', '', '1', '1', null, '1', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('9', '2020-04-20', '', '1', '1', null, '1', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('10', '2020-04-20', '', '1', '1', null, '1', '1', null, null);
INSERT INTO `t_orderservices` VALUES ('11', '2020-04-22', '', '1', '1', null, '2', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('12', '2020-04-23', '', '1', '1', null, '1', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('13', '2020-04-30', '', '1', '1', null, '2', '1', null, '11');
INSERT INTO `t_orderservices` VALUES ('14', '2020-05-01', '', '1', '1', null, '2', '1', null, '11');

-- ----------------------------
-- Table structure for t_service
-- ----------------------------
DROP TABLE IF EXISTS `t_service`;
CREATE TABLE `t_service` (
  `ser_id` int(11) NOT NULL AUTO_INCREMENT,
  `ser_name` varchar(255) DEFAULT NULL,
  `ser_classify` varchar(255) DEFAULT NULL,
  `ser_pet` varchar(255) DEFAULT NULL,
  `ser_desc` text,
  `ser_price` decimal(10,2) DEFAULT NULL,
  `fk_bus_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ser_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_service
-- ----------------------------
INSERT INTO `t_service` VALUES ('1', '寄养宠物', '宠物寄养', '全部', '给你的宠物一个家的体验', '299.00', '1');
INSERT INTO `t_service` VALUES ('2', '宠物医疗', '宠物医疗', '全部', '从业多年，值的信赖', '198.00', '1');
INSERT INTO `t_service` VALUES ('3', '修毛', '宠物美容', '全部', '给中小型宠物修理毛发', '139.00', '1');
INSERT INTO `t_service` VALUES ('4', '给宠物洗澡', '宠物美容', '全部', '暗室逢灯D备注', '34.44', '1');

-- ----------------------------
-- Table structure for t_servicerun
-- ----------------------------
DROP TABLE IF EXISTS `t_servicerun`;
CREATE TABLE `t_servicerun` (
  `sR_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_shop_id` int(11) DEFAULT NULL,
  `fk_ser_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sR_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_servicerun
-- ----------------------------
INSERT INTO `t_servicerun` VALUES ('3', '9', '3');
INSERT INTO `t_servicerun` VALUES ('13', '9', '4');
INSERT INTO `t_servicerun` VALUES ('14', '2', '4');
INSERT INTO `t_servicerun` VALUES ('17', '1', '1');
INSERT INTO `t_servicerun` VALUES ('18', '2', '1');
INSERT INTO `t_servicerun` VALUES ('27', '2', '2');
INSERT INTO `t_servicerun` VALUES ('30', '1', '6');
INSERT INTO `t_servicerun` VALUES ('31', '9', '6');

-- ----------------------------
-- Table structure for t_shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `t_shoppingcart`;
CREATE TABLE `t_shoppingcart` (
  `sC_id` int(11) NOT NULL AUTO_INCREMENT,
  `sC_num` int(11) DEFAULT NULL,
  `fk_user_id` int(11) DEFAULT NULL,
  `fk_good_id` int(11) DEFAULT NULL,
  `fk_ser_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sC_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_shoppingcart
-- ----------------------------

-- ----------------------------
-- Table structure for t_shops
-- ----------------------------
DROP TABLE IF EXISTS `t_shops`;
CREATE TABLE `t_shops` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(255) DEFAULT NULL,
  `shop_status` int(11) DEFAULT NULL,
  `shop_phone` varchar(255) DEFAULT NULL,
  `shop_address` varchar(255) DEFAULT NULL,
  `shop_desc` varchar(255) DEFAULT NULL,
  `fk_bus_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_shops
-- ----------------------------
INSERT INTO `t_shops` VALUES ('1', '王府井百货(春熙路店)', '2', '028-86621188', '锦江区华兴正街9号王府井百货商城内', '大型百货,附有超市,超市,百货', '1');
INSERT INTO `t_shops` VALUES ('2', '新世界百货(成都店)', '2', '028-86678737', '锦江区盐市口顺城大街8号（中环广场）', '百货,商场', '1');
INSERT INTO `t_shops` VALUES ('3', '伊藤洋华堂(春熙店)\r\n', '2', '028-86715111', '锦江区红星路三段大科甲巷8号', '综合商场,超市,商场', '3');
INSERT INTO `t_shops` VALUES ('4', '茂业百货(总府路店)', '2', '028-86723666', '锦江区春熙路北段56号', '\r\n百货', '2');
INSERT INTO `t_shops` VALUES ('5', 'Tiffany & Co.(九龙仓店)', '2', '028-68907738', '锦江区红星路三段1号IFS国际金融中心317室', '宠物玩具', '6');
INSERT INTO `t_shops` VALUES ('6', '木九十(王府井店)', '2', '18982295040', '锦江区总府路15号王府井百货4楼', '宠物玩具', '6');
INSERT INTO `t_shops` VALUES ('9', '宠物一号店', '2', '13456789098', '红瓦寺街1号', '齐全的宠物用品商店', '1');

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_username` varchar(255) DEFAULT NULL,
  `user_gender` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `user_address` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_users
-- ----------------------------
INSERT INTO `t_users` VALUES ('1', '小强', '琪琪', '男', '15456789', 'http://192.168.1.143:3000/images/1585882923cangyue3.jpg', null);
INSERT INTO `t_users` VALUES ('11', '南', '', '男', '', 'http://192.168.43.250:3000/images/1587964966wx025136131c7ea035.o6zAJs2rapGc4PlaKmiSFRsBSwzw.mcXxLRWBxkhWbc9f3800646b034a7871c16220606726.jpg', '3');
