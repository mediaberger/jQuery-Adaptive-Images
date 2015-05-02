;( function( $, window, document, undefined ) {
    "use strict";

    var pluginName = "___prefix",
        pluginClassName = "___prefix_image",
        defaults = {
            offset: 100
        },
        items = [],
        doit = function() {
            $( "[data-___prefix]" ).___prefix();
        };

    function isRetinaDisplay() {
        if ( window.matchMedia ) {
            var mq = window.matchMedia(
                "only screen and (min--moz-device-pixel-ratio: 1.3), " +
                "only screen and (-o-min-device-pixel-ratio: 2.6/2), " +
                "only screen and (-webkit-min-device-pixel-ratio: 1.3), " +
                "only screen  and (min-device-pixel-ratio: 1.3), " +
                "only screen and (min-resolution: 1.3dppx)"
            );
            if ( mq && mq.matches || ( window.devicePixelRatio > 1 ) ) {
                return true;
            } else {
                return false;
            }
        }
    }

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend( Plugin.prototype, {
        init: function() {
            this.collectItem();
        },
        update: function() {
            this.collectItem();
        },
        collectItem: function() {
            if ( jQuery.inArray( this.element, items ) === -1 ) {
                items.push( this.element );
                var self = this;
                $( this.element ).bind( "scrollin", function() {
                    $( self.element ).unbind( "scrollin" );
                    items.splice( $.inArray( self.element, items ), 1 );
                    self.doItem();
                } );
            }
        },
        doItem: function() {
            var $elm = $( this.element ),
                $parent = $elm.parent(),
                elmId = "",
                elmClass = "",
                elmAlt = "",
                elmTitle = "",
                matches = [],
                $sources = $elm.find( "span" ),
                $match = false,
                $picture = $elm.next();
            if ( $elm.data( "___prefix-id" ) ) {
                elmId = $elm.data( "___prefix-id" );
            }
            if ( $elm.data( "___prefix-class" ) ) {
                elmClass = $elm.data( "___prefix-class" );
            }
            if ( $elm.data( "___prefix-alt" ) ) {
                elmAlt = $elm.data( "___prefix-alt" );
            }
            if ( $elm.data( "___prefix-title" ) ) {
                elmTitle = $elm.data( "___prefix-title" );
            }
            $sources.each( function() {
                var width = $( this ).data( "___prefix-width" );
                if ( width >= $parent.width() ) {
                    matches.push( $( this ) );
                }
            } );
            if ( !$picture.hasClass( pluginClassName ) ) {
                $picture = false;
            }
            if ( matches.length ) {
                $match = matches.shift();
                if ( isRetinaDisplay() ) {
                    var $testRetina = matches[0];
                    if (
                        typeof $testRetina.data( "___prefix-retina" ) !== undefined &&
                        $testRetina.data( "___prefix-width" ) === $match.data( "___prefix-width" )
                    ) {
                        $match = matches.shift();
                    }
                }
                if ( $picture === false ) {
                    $picture = $( "<img>" );
                    $elm.after( $picture );
                } else {
                    if ( $match.data( "___prefix-src" ) === $picture.src ) {
                        return;
                    }
                }
                $picture.attr( "src", $match.data( "___prefix-src" ) );
                $picture.attr( "id", elmId );
                $picture.attr( "title", elmTitle );
                $picture.attr( "alt", elmAlt );
                $picture.attr( "class", elmClass );
                $picture.addClass( pluginClassName );
            } else {
                if ( $picture ) {
                    $picture.remove();
                }
            }
            $elm.trigger( pluginName );
        }
    } );

    $.fn[pluginName] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, pluginName ) ) {
                $.data( this, pluginName, new Plugin( this, options ) );
            } else {
                $.data( this, pluginName ).update();
            }
        } );
    };

    $( window ).resize( function() {
        doit();
    } );
    $( document ).ready( function() {
        doit();
    } );

} )( jQuery, window, document );
