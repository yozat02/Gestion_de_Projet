// Users

db.createUser({
    user: "mongo",
    pwd: "mongo",
    roles: [
        {
            role: "readWrite",
            db: "pfa-database"
        }
    ]
});

// Collections

const projetOID = ObjectId();

const developpeurs = [
    {
        _id: ObjectId(),
        name: "developpeur 1"
    },
    {
        _id: ObjectId(),
        name: "developpeur 2",
    },
    {
        _id: ObjectId(),
        name: "developpeur 3"
    },
    {
        _id: ObjectId(),
        name: "developpeur 4"
    },
    {
        _id: ObjectId(),
        name: "developpeur 5"
    },
    {
        _id: ObjectId(),
        name: "developpeur 6"
    }
];


db.projets.insertMany([
    {
        _id: ObjectId(),
        name: "projet 1",
        description: "lorem ipsum",
        taches: [
            {
                _id: ObjectId(),
                name: "tache 1",
                description: "lorem ipsum",
                developpeurs: [developpeurs[3]._id.valueOf(), developpeurs[4]._id.valueOf(), developpeurs[5]._id.valueOf()]
            },
            {
                _id: ObjectId(),
                name: "tache 2",
                description: "lorem ipsum"
            },
            {
                _id: ObjectId(),
                name: "tache 3",
                description: "lorem ipsum"
            }
        ]
    },
    {
        _id: ObjectId(),
        name: "projet 2",
        description: "lorem ipsum",
        taches: [
            {
                _id: ObjectId(),
                name: "tache 4",
                description: "lorem ipsum"
            },
            {
                _id: ObjectId(),
                name: "tache 5",
                description: "lorem ipsum"
            },
            {
                _id: ObjectId(),
                name: "tache 6",
                description: "lorem ipsum"
            }
        ],
    },
    {
        _id: ObjectId(),
        name: "projet 3",
        description: "lorem ipsum"
    }
]);


db.developpeurs.insertMany(developpeurs);
