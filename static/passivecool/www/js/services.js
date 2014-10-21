angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Status', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var status =  {
            "temperature" : 73.2,
            "humidity": 0.34,
            "light_level": 512,
            "position": -30
    };

    return {
        get: function() {
            return status;
        }
    }
})
;
