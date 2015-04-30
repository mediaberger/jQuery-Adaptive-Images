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
            $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );

            //if (!$.data(this, "plugin_" + pluginName)) {
            //    $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            //}
        } );
    };

    $( window ).resize( function() {
        doit();
    } );
    $( document ).ready( function() {
        doit();
    } );

} )( jQuery, window, document );
