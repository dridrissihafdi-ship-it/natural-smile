// Configuration de Natural Smile (projet Firebase natural-smile-7e154).
// Ces clés sont faites pour être visibles dans l'application : la protection
// des données est assurée par les règles de sécurité (firestore.rules, storage.rules).
self.NS_CONFIG = {
  firebase: {
    apiKey: "AIzaSyAPMDFImP4tkiLiR7kOGzDJYoQkl-d6O34",
    authDomain: "natural-smile-7e154.firebaseapp.com",
    projectId: "natural-smile-7e154",
    storageBucket: "natural-smile-7e154.firebasestorage.app",
    messagingSenderId: "795758483495",
    appId: "1:795758483495:web:61879f14cdcbaf49819602"
  },
  // Clé publique Web Push (Cloud Messaging).
  vapidKey: "BC7VE-gplJ0NWzcRQn205S8sBJIPcBifTA-xYDkqEvWU-tATG1rLL_sVPdsFXQRNkRUJgkigLnvMdqN_9XCzacE",
  // Seul compte administrateur (doit aussi figurer dans firestore.rules, storage.rules et functions/index.js).
  adminEmails: ["dr.hafdi.idrissi@gmail.com"]
};
