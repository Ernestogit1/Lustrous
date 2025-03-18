const admin = require('firebase-admin');

const serviceAccount = {
    "type": "service_account",
    "project_id": "lustrous-407b3",
    "private_key_id": "fb25baac80cf554a9e69ec9ea62a790ce3a735b3",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdKuSoBctTRm46\nuXwBYFCU9WiZFri1c7EgPhdCe512eXOlbRC42sfg8iSLg3XHw1F1rKx4I4J7GlNm\n/WR+o0JC4gQjA/14fCPZAAl90wcFPxxt3kUZT5eiSoV3OLQjqzg4ugXJc6zOMneC\n8t/DlDYdY8B8tnHmUJS1oCRYNtTGqD5jT2B555650imss8bTIlcDusqRngqbIsTI\n3QtNCNPa9Rv7XzpMpSm5xox4v8ss0RsWEdCHcTplWp0WJVo77aLe3qgg1t2VAfvX\nQTYdxP8XzTuLnnBOdsR47s3EvaCLsHQqfLtaRfvmEKI/VrcjMv9oLjl7xLdv5MYF\n4GoTwJdPAgMBAAECggEAPWCGWk2k+TjsjDdqg3kTDxEFj59tc8Mh/XbyC28N77n/\nXS+KE76wxxqZBfjJMsGGmt9bnTE04BFIV9SF/eSQ2GC+f9QrlPVZ5IEcs8wJFlXu\nqsNeFcPc8i6LD6OPycwwUQrofqMTbZUM0hE6LH1BYtnVTn7LXUfDw2guOVr0Xj2x\nzZzAV2xilOQTNm0QdqI0CRk6OiTh2wYJNz9MVYu4DqU6d2LvGMHGITyXIKJG5gdN\neeAvcdsyOYHxyPSAWi5+HTInZJjkDP8RmyEVZQjviodKnJ8Fq2X0KQqOF2O2y7Ws\n6oSfGfB94MkIHTBue8B+NR+n4iQ48ZN0ZV/WSI+8GQKBgQDXK2rGf26AH8c0XQGy\nQ0Zpx0iJIcj131xa5LUtCboQRRA4HVG+0X2pVnU3TB98ncknBSiRActyQa/d9a+X\nmnELCv2dgVyIv0PBeuGphzbk4CIXV/u1OAGW6sM2xrcs/rsdJCNZ0IaTqn3fGyhh\nMvqG46gcqloBlAQZrtj8LNmKWQKBgQC6/dUrA3QA0QAMqEAWZTtKCqqBsw7uQTHs\nbTIFHUXBdNKmPFAGP9h1I9biCvf2u72LYLCUnkW92YQ2wNAXE06g4hCjP8u0oBkn\nsGmlgNTN+nwStAB94MNKzYYyTWHeI3Edd99iQz0lWltk65I4JiJvglwU8rRIgM42\nu1eX1CCp5wKBgQCnONnp3J2PO6NAgcvQs9IkYTlxQe2BkI6hIT/g+b895768LaUb\nLIqBsWy1hhaubZ4oEi09zOxFJuG8GbXWl7OlBmymHSRCLotE8fAxJaG27K3yAHHh\nm944YMlIZ9VyRaI7+prysUn1tznNy7htGgZ0ELfVV1tOAK/TGf0Otvh2OQKBgQCm\nVkobuzSjzUcX+0sXIPH+yUInodq0QjZgtDn8pq94ia0gxyIAjSbF/R2Xcl5lk1fm\n9hnd+nTbjvS3qAjzne8h2jcmoQdaI9h8n8c6vEGRATMBiDGvyBKxJeYsNP3MFwb2\nSb3isSFhauFGAu/NFs8nFnVHBScuH7ZQpZIjs0VjHQKBgBCkrQZQHy5lMKQlIxUJ\nQX1hj94Z3XEhFZ8G8WP00iA1gzvbJOUeeduq3oHAEOjv85x38OZvdW7+OUs2cedS\nCHd0mR6AH55QFsBxiINjwDjJwg2/smGrTZoP5pdFPVTxcqgPKxFZSAZdUGaJhZRK\nojyGWuRIvNtl1nNpcQBYoTgP\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@lustrous-407b3.iam.gserviceaccount.com",
    "client_id": "112498126450981252157",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40lustrous-407b3.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;