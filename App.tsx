import { useCallback } from "react";

import { useDataEnhancementPlugin } from "@firecms/data_enhancement";

import { User as FirebaseUser } from "firebase/auth";
import { Authenticator, FirebaseCMSApp } from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { firebaseConfig } from "./firebase-config.ts";
import { productsCollection } from "./collections/products.tsx";
import { catalogCollection } from "./collections/catalog.js";
import { blogCollection } from "./collections/blog.js";

export default function App() {


    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
                                                                                user,
                                                                                authController
                                                                            }) => {
        /*
        if (user?.email?.includes("blazed.space")) {
            const adminUserData = await Promise.resolve({
                roles: ["admin"]
            });
            authController.setExtra(adminUserData);
        }
        */
        console.log("Allowing access to", user?.email);
        // This is an example of retrieving async data related to the user
        // and storing it in the controller's extra field.
        const sampleUserRoles = await Promise.resolve(["admin"]);
        authController.setExtra(sampleUserRoles);

        return true;
    }, []);


    const dataEnhancementPlugin = useDataEnhancementPlugin({
        // Paths that will be enhanced
        getConfigForPath: ({ path }) => {
            return true;
        }
    });

    return <FirebaseCMSApp
        name={"Blazed CMS System"}
        plugins={[dataEnhancementPlugin]}
        logo="https://blazed.sirv.com/logo/Beaker-Dark.png"
        logoDark="https://blazed.sirv.com/logo/Beaker-White.png"
        authentication={myAuthenticator}
        collections={[
            productsCollection, 
            catalogCollection,
            blogCollection
        ]}
        firebaseConfig={firebaseConfig}
    />;
}
