import React, { useState, useEffect, useReducer } from "react";
import Firebase from "firebase/app";
import { FirestoreCollection } from "react-firestore";

import { Spinner } from "@chakra-ui/react";
import NavLink from "../Shared/NavLink";

const TestComponent = (props) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const testFetchFromFirestore = (collection = "posts") => {
      try {
        var db = Firebase.firestore();
        db.collection("posts")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log({ id: doc.id, data: doc.data() });
            });
          });
      } catch (err) {
        console.log("Failed:testFetchFromFirestore", err);
      }
    };
    testFetchFromFirestore();
  }, []);

  return (
    <div>
      <h1>TestComponent</h1>

      <FirestoreCollection path={"posts"} sort='_likeCount:desc'>
        {({ error, isLoading, data }) => {
          if (error) {
            return (
              <div>
                <p>Error: {error}</p>
              </div>
            );
          }

          if (isLoading) {
            return <Spinner color='brand.800' />;
          }

          if (data.length === 0) {
            return <p>No posts yet</p>;
          }

          return (
            <div>
              <p>Posts: {data.length}</p>
              {data.map((post) => (
                <div>
                  <NavLink to={`/${post.slug}`} variant='link' size='lg'>
                    {post.title}
                  </NavLink>
                </div>
              ))}
            </div>
          );
        }}
      </FirestoreCollection>
    </div>
  );
};

export default TestComponent;
