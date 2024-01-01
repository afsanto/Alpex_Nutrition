(function($){"use strict";const $topbar=$(".js-topbar");const $nav=$(".js-main-nav");const $navTrigger=$(".js-nav-toggle");const $navLinks=$(".js-main-nav-link");const $subscribeLink=$(".js-nav-subscribe-link");const $learnLink=$(".js-nav-learn-link");const $searchTrigger=$('.js-search-trigger');const $searchBar=$('.js-search-bar');const $searchInput=$('.js-search-input');const $searchClose=$('.js-search-close');if(!$nav.length){return;}
$learnLink.on("click",function(e){if(!isMobile()){return;}
e.preventDefault();toggleSubscribeDropdown("hide");toggleLearnDropdown();});$subscribeLink.on("click",function(e){if(!isMobile()){return;}
e.preventDefault();toggleLearnDropdown("hide");toggleSubscribeDropdown();});$navLinks.on("click",function(e){if(!isMobile()){return;}
e.preventDefault();$navLinks.not(this).next().addClass("hidden");$navLinks.not(this).find(".icon").removeClass("pk-arrow-up").addClass("pk-arrow-down");$(this).next().toggleClass("hidden");$(this).find(".icon").toggleClass("pk-arrow-down pk-arrow-up");});$searchTrigger.on('click',function(e){e.preventDefault();$('html').addClass("search-bar-triggered");$searchBar.removeClass("hidden").addClass("flex");$searchInput.focus();if(isMobile()){toggleNav("hide");toggleLearnDropdown("hide");toggleSubscribeDropdown("hide");}});$searchInput.on('focus',function(){$(this).addClass('active');$searchClose.addClass('active');});$searchInput.on('blur',function(){$(this).removeClass('active');$('html').removeClass("search-bar-triggered");$searchBar.removeClass("flex").addClass("hidden");$searchClose.removeClass('active');});$searchClose.on('click',function(){$(this).removeClass('active');$('html').toggleClass("search-bar-triggered");$searchBar.removeClass("flex").addClass("hidden");$searchInput.removeClass('active');});$navTrigger.click(toggleNav);function isMobile(){return window.matchMedia('(max-width: 1023px)').matches;}
function toggleNav(display){var $icon=$navTrigger.find('.icon');if(display==="hide"||$nav.css("display")==="block"){display=false;}else{display=true;}
var openClasses={"body":"fixed overflow-hidden inset-0","topbar":"fixed top-0 w-full","nav":"fixed top-16 overflow-y-auto bottom-25 w-full"};$("html, body").toggleClass(openClasses.body,display);$topbar.toggleClass(openClasses.topbar,display);if(display){$icon.removeClass("pk-menu").addClass("pk-close-2");}else{$icon.removeClass("pk-close-2").addClass("pk-menu");}
$nav.toggleClass("hidden").toggleClass(openClasses.nav,display);closeDropdowns();toggleLearnDropdown("hide");toggleSubscribeDropdown("hide");}
function toggleLearnDropdown(display){let $icon=$learnLink.find(".icon");let $dropdown=$(".js-nav-learn-dropdown");let $container=$learnLink.parent();if(display==="hide"||$dropdown.css("display")==="block"){display=false;}else{display=true;}
closeDropdowns();if(display){$dropdown.removeClass("hidden");$learnLink.removeClass("bg-white").addClass("bg-green-200").find("*").addClass("text-green-500");$icon.removeClass("pk-lightbulb").addClass("pk-close-2").next().text("Close");}else{$dropdown.addClass("hidden");$learnLink.removeClass("bg-green-200").addClass("bg-white").find("*").removeClass("text-green-500");$icon.removeClass("pk-close-2").addClass("pk-lightbulb").next().text("Learn");}}
function toggleSubscribeDropdown(display){let $icon=$subscribeLink.find(".icon");let $dropdown=$subscribeLink.next();let $parent=$subscribeLink.parent();if(display==="hide"||$dropdown.css("display")==="block"){display=false;}else{display=true;}
closeDropdowns();if(display){$dropdown.removeClass("hidden");$subscribeLink.removeClass("bg-white").addClass("bg-green-200").find("*").addClass("text-green-500");$icon.removeClass("pk-deal").addClass("pk-close-2").next().text("Close");}else{$dropdown.addClass("hidden");$subscribeLink.removeClass("bg-green-200").addClass("bg-white").find("*").removeClass("text-green-500");$icon.removeClass("pk-close-2").addClass("pk-deal").next().text("Save 20%");}}
function closeDropdowns(){$navLinks.next().addClass("hidden");$navLinks.find(".icon").removeClass("pk-arrow-up").addClass("pk-arrow-down");}
$('.site-subnav__bundles.mobile').click(function(){mobileBundlesMenu();});$('.site-subnav__links .site-subnav__learn').click(function(){$('.site-subnav--learn').find('img').each(function(){if(this.src.length<1){$(this).attr("src",$(this).data("src"));}});mobileLearnMenu();});})(jQuery);