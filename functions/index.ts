const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { Client } = require("@googlemaps/google-maps-services-js");
const { payRequest } = require("./pay");

const client = new Client({});
const stripeClient = require("stripe")(functions.config().stripe.key);

exports.geocode = functions.https.onRequest((request: any, response: any) => {
  geocodeRequest(request, response, client);
});

exports.placesNearby = functions.https.onRequest(
  (request: any, response: any) => {
    placesRequest(request, response, client);
  }
);

exports.pay = functions.https.onRequest((request: any, response: any) => {
  payRequest(request, response, stripeClient);
});
