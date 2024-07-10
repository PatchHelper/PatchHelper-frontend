import React, { useState, useEffect } from "react";

import { Patch } from "../types";
import api from "../api";
import { PatchOverview, AsideBox } from "../components";

const MainApp: React.FC = () => {
  const [posts, setPosts] = useState<Patch[]>([]);
    
  useEffect(() => {
      const fetchPosts = async () => {
          const response = await api.get('/patches/');
          setPosts(response.data);
      };

      fetchPosts();
  }, []);

  return (
    <main className="flex flex-col gap-y-8 px-8 md:px-[11.25%]">
      <div id="Content" className="flex flex-row gap-x-9">
        <div id="PatchesCol" className="md:w-[70%]">
          <div id="Title" className="flex flex-col gap-y-4 py-6 align-middle">
            <h1 className="boldheader3 text-text">Welcome to PatchHelper!</h1>
            <p className="semiboldheader4 text-text opacity-70">Here, you can browse community made patches and modifications made for specific games.</p>
          </div>
          <div id="LatestUploads" className="flex flex-col gap-y-6">
            <h2 className="semiboldheader2 text-clr_primary">Recent uploads</h2>
            <div className="flex flex-col gap-y-4">
              {posts.map((patch, index) => (
                <PatchOverview key={index} title={patch.title} description={patch.description} creator={patch.creator_username} created_at={patch.created}  />
              ))}
            </div>
          </div>
        </div>
        <aside id="AsideCol" className="hidden md:w-[28%] md:flex flex-col gap-y-8">
          <AsideBox variant="register" />
          <AsideBox variant="statistics" />
        </aside>
      </div>
    </main>
  );
};

export default MainApp;