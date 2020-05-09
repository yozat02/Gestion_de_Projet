const { Projet } = require("../models/Projet")

const projetsResolvers = {

    Query: {
        projets: () => Projet.find(),
        projet: async (root, { projetId }) => await Projet.findById(projetId),

    },
    Mutation: {
        createProjet: async (root, { input }) => await new Projet({ name: input.name, description: input.description ,responsable :input.responsable }).save(),
        // Update Project
        updateProjet: async (obj, { input: { projetId, name, description,responsable } }) => {
            try {
                const options = { new: true };
                return await Projet.findByIdAndUpdate(projetId, { name, description,responsable }, options)
            } catch (error) {
                throw new Error(error);
            }
        },
        // delete project 
        // deleteProjet: async (obj, { id }) => {
        //     try {
        //         let projects = []
        //         let portfolios = []
        //         let isPortfolioSuccessfullyDeleted = false;
        //         let isProjectsSuccessfullyDeleted = false;
        //         let notFoundNestedProjects = false;

        //         const searchNestedProjects = (portfolio, listProjects) => {
        //             portfolio.projects && portfolio.projects.map(project => listProjects.push(project));
        //             portfolio.programs && portfolio.programs.map(program => program.projects && program.projects.map(project => listProjects.push(project)));
        //         };

        //         let aggregate = await Portfolio.aggregate([
        //             {
        //                 '$match': { _id: mongoose.Types.ObjectId(id) }
        //             },
        //             {
        //                 '$graphLookup': {
        //                     'from': 'portfolios',
        //                     'startWith': '$_id',
        //                     'connectFromField': '_id',
        //                     'connectToField': 'parent',
        //                     'as': 'childrenHierarchy'
        //                 }
        //             }
        //         ])

        //         aggregate && aggregate.length >= 1 && aggregate.map(e => {
        //             portfolios.push(e._id);
        //             searchNestedProjects(e, projects);
        //             e.childrenHierarchy.length >= 1 && e.childrenHierarchy.map(e => {
        //                 portfolios.push(e._id);
        //                 searchNestedProjects(e, projects)
        //             });
        //         })

        //         // DELETE * Portfolios
        //         if (portfolios.length >= 1) {
        //             let deleteMany = await Portfolio.deleteMany({ _id: { $in: portfolios } });
        //             if(deleteMany.deletedCount === portfolios.length) isPortfolioSuccessfullyDeleted = true;
        //         }
        //         // DELETE * Projects
        //         if (projects.length >= 1) {
        //             let deleteMany = await Project.deleteMany({ _id: { $in: projects } });
        //             if(deleteMany.deletedCount === projects.length) isProjectsSuccessfullyDeleted = true;
        //         } else {
        //             notFoundNestedProjects = true;
        //         }

        //         return isPortfolioSuccessfullyDeleted && (isProjectsSuccessfullyDeleted || notFoundNestedProjects);
        //     } catch (error) {
        //         throw new Error(error);
        //     }
        // }
    },

};

module.exports = {
    projetsResolvers
}