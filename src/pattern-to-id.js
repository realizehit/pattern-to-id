var Subscription = require( 'realizehit-subscription' )
var crypto = require( 'crypto' )

var debug = require( 'debug' )( 'realizehit:pattern-to-id' )

function pattern2id ( pattern ) {

    debug( "trying to figure out id of", pattern )

    var stringified =
        typeof pattern == 'object' && (
            pattern instanceof Subscription && pattern.toString() ||
            (new Subscription( pattern )).toString()
        ) ||
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
