(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/confirmation"],{

/***/ 100:
/*!********************************************************************************************************!*\
  !*** E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue?vue&type=template&id=6a0a722e& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_template_id_6a0a722e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirmation.vue?vue&type=template&id=6a0a722e& */ 101);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_template_id_6a0a722e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_template_id_6a0a722e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 101:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue?vue&type=template&id=6a0a722e& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", { staticStyle: { width: "100%" } }, [
    _c(
      "view",
      {
        staticClass: "addr",
        attrs: { eventid: "0b3b29be-0" },
        on: { tap: _vm.selectAddress }
      },
      [
        _vm._m(0),
        _c(
          "view",
          { staticClass: "right" },
          [
            _vm.address != null && _vm.address != ""
              ? _c("block", [
                  _c("view", { staticClass: "tel-name" }, [
                    _c("view", { staticClass: "name" }, [
                      _vm._v(_vm._s(_vm.address.name))
                    ]),
                    _c("view", { staticClass: "tel" }, [
                      _vm._v(_vm._s(_vm.address.phoneNumber))
                    ])
                  ]),
                  _c("view", { staticClass: "addres" }, [
                    _vm._v(
                      _vm._s(_vm.address.province) +
                        "-" +
                        _vm._s(_vm.address.city) +
                        "-" +
                        _vm._s(_vm.address.region) +
                        "\n\t\t\t\t" +
                        _vm._s(_vm.address.detailAddress)
                    )
                  ])
                ])
              : _c("block", [
                  _c(
                    "view",
                    {
                      staticStyle: {
                        "font-size": "30rpx",
                        "line-height": "80rpx"
                      }
                    },
                    [_vm._v("请选择地址")]
                  )
                ])
          ],
          1
        )
      ]
    ),
    _c("view", { staticClass: "buy-list" }, [
      _c("view", { staticClass: "row" }, [
        _vm.orderMsg.product
          ? _c("view", { staticClass: "goods-info" }, [
              _c("view", { staticClass: "img" }, [
                _c("image", { attrs: { src: _vm.orderMsg.product.pic } })
              ]),
              _c("view", { staticClass: "info" }, [
                _c("view", { staticClass: "title" }, [
                  _vm._v(_vm._s(_vm.orderMsg.product.name))
                ]),
                _c("view", { staticClass: "spec" }, [_vm._v("数量:1")]),
                _c("view", { staticClass: "price-number" }, [
                  _c("view", { staticClass: "price" }, [
                    _vm._v("￥" + _vm._s(_vm.orderMsg.pointsNum) + " 积分")
                  ]),
                  _c("view", { staticClass: "number" })
                ])
              ])
            ])
          : _vm._e()
      ])
    ]),
    _c("view", { staticClass: "order" }, [
      _c("view", { staticClass: "row" }, [
        _c("view", { staticClass: "left" }, [_vm._v("备注 :")]),
        _c("view", { staticClass: "right" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.note,
                expression: "note"
              }
            ],
            attrs: { placeholder: "选填,备注内容", eventid: "0b3b29be-1" },
            domProps: { value: _vm.note },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.note = $event.target.value
              }
            }
          })
        ])
      ])
    ]),
    _c("view", { staticClass: "detail" }, [
      _c("view", { staticClass: "row" }, [
        _c("view", { staticClass: "nominal" }, [_vm._v("运费")]),
        _c("view", { staticClass: "content" }, [
          _vm._v("￥+" + _vm._s(_vm._f("toFixed")(_vm.orderMsg.expressPrice)))
        ])
      ]),
      _c("view", { staticClass: "row" }, [
        _c("view", { staticClass: "nominal" }, [_vm._v("积分")]),
        _c("view", { staticClass: "content" }, [
          _vm._v(_vm._s(_vm._f("toFixed")(_vm.orderMsg.pointsNum)))
        ])
      ])
    ]),
    _c("view", { staticClass: "blck" }),
    _c("view", { staticClass: "footer" }, [
      _c("view", { staticClass: "settlement" }, [
        _c("view", { staticClass: "sum" }, [
          _vm._v("合计:"),
          _c("view", { staticClass: "money" }, [
            _vm._v("￥" + _vm._s(_vm._f("toFixed")(_vm.orderMsg.payAmount)))
          ])
        ]),
        _c(
          "view",
          {
            staticClass: "btn",
            attrs: { eventid: "0b3b29be-2" },
            on: { tap: _vm.toPay }
          },
          [_vm._v("提交订单")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "icon" }, [
      _c("image", { attrs: { src: "../../static/img/addricon.png", mode: "" } })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ 102:
/*!**************************************************************************************************!*\
  !*** E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirmation.vue?vue&type=script&lang=js& */ 103);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 103:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;











































































































var _vmeitimeHttp = __webpack_require__(/*! @/common/vmeitime-http/ */ 17);var _default =
{
  data: function data() {
    return {
      buylist: [], //订单列表
      goodsPrice: 0.0, //商品合计价格
      sumPrice: 0.0, //用户付款价格
      freight: 12.00, //运费
      note: '', //备注
      int: 1200, //抵扣积分
      deduction: 0, //抵扣价格
      productId: { name: "" //商品id
      }, addressId: "" //地址id
      , orderMsg: "",
      address: "",
      confirmOrderFlag: true };

  },
  onLoad: function onLoad(e) {
    this.productId = e.productId;

  },
  onShow: function onShow() {
    //页面显示时，加载订单信息

    var that = this;
    uni.getStorage({
      key: 'addressId',
      success: function success(res) {
        that.addressId = res.data;
        //获取确认订单信息
        that.getConfirmOrderMsg();
      },
      fail: function fail(res) {
        that.getConfirmOrderMsg();
      } });

  },
  onHide: function onHide() {

  },
  onBackPress: function onBackPress() {
    //页面后退时候，清除订单信息
    this.clearOrder();
  },
  filters: {
    toFixed: function toFixed(x) {
      return parseFloat(x).toFixed(2);
    } },

  methods: {
    clearOrder: function clearOrder() {var _this = this;
      uni.removeStorage({
        key: 'buylist',
        success: function success(res) {
          _this.buylist = [];
          console.log('remove buylist success');
        } });

    },
    toPay: function toPay() {
      var that = this;
      if (!that.confirmOrderFlag) {
        uni.showToast({ title: '请勿重复提交', icon: 'none' });
        return;
      }
      that.confirmOrderFlag = false;
      //商品列表
      if (that.address == null || that.address == '') {
        uni.showToast({ title: '地址不能为空', icon: 'none' });
        return;
      }
      if (that.productId == null || that.productId == '') {
        uni.showToast({ title: '订单信息有误，请重新购买', icon: 'none' });
        return;
      }
      uni.showLoading({
        title: '正在提交订单...' });

      (0, _vmeitimeHttp.submitOrder)({
        'orderNote': that.note,
        'addressId': that.addressId,
        'productId': that.productId }).
      then(function (res) {
        console.log('request success', res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          if (res.data.data.orderStatus == 0) {
            that.handlePay(res.data.data.orderId);
          } else {
            uni.redirectTo({
              url: "../pay/success" });

          }
        }
        uni.showToast({ title: res.data.message, icon: 'none' });
        uni.hideLoading();
        that.confirmOrderFlag = true;
      }).catch(function (err) {
        console.log('request fail', err);
        uni.hideLoading();
        that.confirmOrderFlag = true;
      });

    },
    //调用支付
    handlePay: function handlePay(orderId) {
      (0, _vmeitimeHttp.unifiedOrder)({
        'orderId': orderId }).
      then(function (res) {
        console.log('request success', res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          uni.requestPayment({
            provider: 'wxpay',
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.packageValue,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function success(res) {
              console.log('success:' + JSON.stringify(res));
              uni.redirectTo({
                url: "../pay/success" });

            },
            fail: function fail(err) {
              uni.redirectTo({
                url: "../myOrder/myOrder?tbIndex=1" });

              console.log('fail:' + JSON.stringify(err));
            } });

        }
      }).catch(function (err) {
        console.log('request fail', err);
      });

    },
    //选择收货地址
    selectAddress: function selectAddress() {
      uni.navigateTo({
        url: '../address/address?type=select' });

    },
    getConfirmOrderMsg: function getConfirmOrderMsg() {
      var that = this;
      (0, _vmeitimeHttp.confirmOrder)({
        productId: that.productId,
        addressId: that.addressId }).
      then(function (res) {
        console.log('request success', res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          that.orderMsg = res.data.data;
          that.address = res.data.data.umsMemberReceiveAddress;
          if (res.data.data.umsMemberReceiveAddress != null && res.data.data.umsMemberReceiveAddress != '') {
            that.addressId = res.data.data.umsMemberReceiveAddress.id;
          }
        }
      }).catch(function (err) {
        console.log('request fail', err);
      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 7)["default"]))

/***/ }),

/***/ 104:
/*!***********************************************************************************************************!*\
  !*** E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirmation.vue?vue&type=style&index=0&lang=scss& */ 105);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 105:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 98:
/*!********************************************************************************************!*\
  !*** E:/cauhuanwork/svn2/trunk/hyb-uniapp/main.js?{"page":"pages%2Forder%2Fconfirmation"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ 1);
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ 20));
var _confirmation = _interopRequireDefault(__webpack_require__(/*! ./pages/order/confirmation.vue */ 99));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_confirmation.default));

/***/ }),

/***/ 99:
/*!*************************************************************************!*\
  !*** E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _confirmation_vue_vue_type_template_id_6a0a722e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirmation.vue?vue&type=template&id=6a0a722e& */ 100);
/* harmony import */ var _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirmation.vue?vue&type=script&lang=js& */ 102);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./confirmation.vue?vue&type=style&index=0&lang=scss& */ 104);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 11);






/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _confirmation_vue_vue_type_template_id_6a0a722e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _confirmation_vue_vue_type_template_id_6a0a722e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/cauhuanwork/svn2/trunk/hyb-uniapp/pages/order/confirmation.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

},[[98,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/confirmation.js.map