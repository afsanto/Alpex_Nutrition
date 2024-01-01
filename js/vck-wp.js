if (typeof asset_host != "string" || asset_host == 'https://d2j3qa5nc37287.cloudfront.net/') window.asset_host = "https://cdn.jst.ai/";
if (window.asset_host.substring(0, 2) == "//") window.asset_host = "https:" + window.asset_host;
if (window.asset_host.substring(window.asset_host.length - 1) != "/") window.asset_host = window.asset_host + "/";
window.ju_host = window.asset_host.split('.')[1]+'.'+window.asset_host.split('.')[2].replace('/','');
window.ju_domain = 'https://my.'+window.ju_host;

juapp('initFunc',function(){

  window.ju_init_fired = true;
  window.ju_resyncing = false;
  window.update_wp_ju_cart = function () {
    try {
      jju.ajax({
        dataType: "json",
        url: "/?pagename=justuno-sync-job&type=cart",
        async: true,
        cache: false
      }).done(
        function (data) {
          if (!ju_resyncing) {
            window.ju_resyncing = true;
            try{
              if (data){
                var fCart = data;
                if (fCart.total != ju_data_session.cartTotals.tp || fCart.items.length != ju_data_session.cartTotals.tq) {
                  var ju_cart_obj = [];
                  if (Array.isArray(fCart.items)){
                    fCart.items.forEach(function (item) {
                      var itemId = item.productid;
                      var itemVariantId = item.variationid;
                      var itemSku = item.sku;
                      var itemTitle = item.name;
                      var itemPrice = item.price;
                      var itemQty = item.quantity;
                      ju_cart_obj.push({ productid: itemId, variationid: itemVariantId, sku: itemSku, quantity: itemQty, price: itemPrice, name: itemTitle })
                    });
                  }
                  juapp(
                    'cartItems',
                    ju_cart_obj
                  );
                  juapp('cart',{total:fCart.total,subtotal:fCart.subtotal,currency:'USD'});
                }
              } else if (Array.isArray(data)){
                juapp(
                  'cartItems',
                  []
                );
              }
              window.ju_resyncing = false;
            }catch(cerror){}
          }
        }
      );
    } catch (e) {
      //ju_logerr('bc add to cart',e);
      //console.log('justuno couldn\'t add the cart info - cart page')
    }
  }

  // only fire this code in bc if they are on the cart page
  if (location.pathname.indexOf("/cart") >= 0) {
    update_wp_ju_cart();
  }

  setTimeout(update_wp_ju_cart, 8000);
});

function ju_loadversionscript(v, vr) {
  if (window.ju_alreadyloaded) return
  (function() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = asset_host + "mwgt_" + v + ".js?v=" + vr;
    if (document.querySelector('script[nonce]') && document.querySelector('script[nonce]')?.nonce!="null" && document.querySelector('script[nonce]')?.nonce!="") s.nonce=document.querySelector('script[nonce]')?.nonce;
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  })();
}

function jju_setCookie(name, value, days, path, secure) {
  // set time, it's in milliseconds
  var today = new Date();
  today.setTime(today.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = name + "=" + escape(value) + ";expires=" + (days == -1 ? "Thu, 01 Jan 1970 00:00:01 GMT" : today.toGMTString()) + (path ? ";path=" + path : "") + (secure ? ";secure" : "" );
}

function jju_getCookie(c_name) {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
  return "";
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var $jujsonp = (function() {
  var that = {};

  that.send = function(src, options) {
    var callback_name = options.callbackName || "callback",
      on_success = options.onSuccess || function() {},
      on_timeout = options.onTimeout || function() {},
      timeout = options.timeout || 10; // sec

    var timeout_trigger = window.setTimeout(function() {
      window[callback_name] = function() {};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data) {
      window.clearTimeout(timeout_trigger);
      on_success(data);
    };

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;

    document.getElementsByTagName("head")[0].appendChild(script);
  };

  return that;
})();

var ju_v = jju_getCookie("_ju_v");
var ju_vr = "";
if (ju_v && ju_v.indexOf("_") != -1) {
  var ju_v_arr = ju_v.split("_");
  ju_v = ju_v_arr[0];
  ju_vr = ju_v_arr[1];
  ju_loadversionscript(ju_v, ju_vr);
} else {
  if (ju_num.match(/^[{]?[0-9a-fA-F]{8}[-]?([0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}[}]?$/)) {
    $jujsonp.send(ju_domain + "/ajax/account_version_check.html?id=" + ju_num, {
      callbackName: "ju_vcheck",
      onSuccess: function(json) {
        //console.log('success!', json);
        ju_v = json.v;
        ju_vr = json.vr;
        jju_setCookie("_ju_v", ju_v + "_" + ju_vr, 0.0208, "/", true);
        ju_loadversionscript(ju_v, ju_vr);
      }
    });
  }
}

