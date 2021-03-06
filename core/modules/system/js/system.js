/**
* DO NOT EDIT THIS FILE.
* All changes should be applied to ./modules/system/js/system.es6.js
* See the following change record for more information,
* https://www.drupal.org/node/2873849
* @preserve
**/

(function ($, Drupal, drupalSettings) {

  'use strict';

  var ids = [];

  Drupal.behaviors.copyFieldValue = {
    attach: function attach(context) {
      for (var sourceId in drupalSettings.copyFieldValue) {
        if (drupalSettings.copyFieldValue.hasOwnProperty(sourceId)) {
          ids.push(sourceId);
        }
      }
      if (ids.length) {
        $('body').once('copy-field-values').on('value:copy', this.valueTargetCopyHandler);

        $('#' + ids.join(', #')).once('copy-field-values').on('blur', this.valueSourceBlurHandler);
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload' && ids.length) {
        $('body').removeOnce('copy-field-values').off('value:copy');
        $('#' + ids.join(', #')).removeOnce('copy-field-values').off('blur');
      }
    },

    valueTargetCopyHandler: function valueTargetCopyHandler(e, value) {
      var $target = $(e.target);
      if ($target.val() === '') {
        $target.val(value);
      }
    },

    valueSourceBlurHandler: function valueSourceBlurHandler(e) {
      var value = $(e.target).val();
      var targetIds = drupalSettings.copyFieldValue[e.target.id];
      $('#' + targetIds.join(', #')).trigger('value:copy', value);
    }
  };
})(jQuery, Drupal, drupalSettings);