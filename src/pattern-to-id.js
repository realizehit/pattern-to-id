var crypto = require( 'crypto' )
var debug = require( 'debug' )( 'realizehit:pattern-to-id' )

function pattern2id ( pattern ) {

    debug( "trying to figure out id of", pattern )

    var stringified =
        typeof pattern == 'object' && (function ( Subscription ) {
            return pattern instanceof Subscription && pattern.pattern.stringify() ||
                   (new Subscription.Pattern( pattern )).stringify()
        })(require( 'realizehit-subscription' )) ||
        typeof pattern == 'string' && pattern ||
        false

    if ( ! stringified ) {
        return
    }

    return crypto
        .createHash( 'md5' )
        .update( stringified )
        .digest( 'hex' )
        .substr( 0, 8 )
}

module.exports = pattern2id
