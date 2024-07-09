import React, { useState, useEffect } from "react";

import { Patch } from "../types";
import api from "../api";
import { Navbar, PatchOverview, Footer, AsideBox } from "../components";

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
    <div className="flex flex-col w-full overflow-x-hidden gap-y-16">
      <Navbar/>

      <main className="flex flex-col gap-y-8 px-8 md:px-[11.25%]">
        <div id="Content" className="flex flex-row gap-x-9">
          <div id="PatchesCol" className="w-[70%]">
            <div id="Title" className="flex flex-col gap-y-4 py-6 align-middle">
              <h1 className="boldheader3 text-text">Welcome to PatchHelper!</h1>
              <p className="semiboldheader4 text-text opacity-70">Here, you can browse community made patches and modifications made for specific games.</p>
            </div>
            <div id="LatestUploads" className="flex flex-col gap-y-6">
              <h2 className="semiboldheader2 text-clr_primary">Recent uploads</h2>
              <div className="flex flex-col gap-y-4">
                {posts.map((patch) => (
                  <PatchOverview title={patch.title} description={patch.description} creator={patch.creator_username} created_at={patch.created}  />
                ))}
              </div>
            </div>
          </div>
          <aside id="AsideCol" className="flex flex-col gap-y-8 w-[28%]">
            <AsideBox variant="register" />
            <AsideBox variant="statistics" />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainApp;