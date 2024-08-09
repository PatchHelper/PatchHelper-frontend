import React, { useState, useEffect} from "react";

import { Patch } from "../types";
import { fetchPatches } from "../services/patchService";
import { PatchOverview, AsideBox, Button, PageController } from "../components";

const SortingOptions = ["New", "Recent", "Top Rated", "Most Downloaded"];
type SortBy = typeof SortingOptions[number];

const Patches: React.FC = () => {
    const [posts, setPosts] = useState<Patch[]>([]);
    const [sort, setSort] = useState<SortBy>("New");
    
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetchPatches();
  
          setPosts(response.data);
        };
  
        fetchPosts();
    }, []);

    const changeSorting = (sort: SortBy) => {
        const fetchPosts = async () => {
            const response = await fetchPatches(sort);
    
            setPosts(response.data);
          };
        
        setSort(sort);
        fetchPosts();
    }

    return (
        <main className="flex flex-col gap-y-8 px-8 md:px-[11.25%]">
        <div id="Content" className="flex flex-row gap-x-9">
          <div id="PatchesCol" className="flex flex-col gap-y-8 md:w-[70%]">
            <div id="Title" className="flex flex-col lg:flex-row gap-y-2">
                <h1 className="boldheader3 text-text">Patch Database</h1>
                <Button variant="primary" text="New Patch" link="/patches/new" className="lg:ml-auto max-w-28"/>
            </div>
            <div className="flex flex-col gap-y-3">
                <PageController/>
                <div id="SortBy" className="flex flex-row bg-background2 gap-x-6 p-4">
                    {SortingOptions.map((value, index) => (
                        <p key={index} className={`basetext text-text cursor-pointer select-none ${value === sort? "opacity-100" : "opacity-70"}`} onClick={() => changeSorting(value)}>{value}</p>
                    ))}
                </div>
            </div>
            <div id="LatestUploads" className="flex flex-col gap-y-6">
              <h2 className="semiboldheader2 text-clr_primary">Recent uploads</h2>
              <div className="flex flex-col gap-y-4">
                {posts.map((patch, index) => (
                  <PatchOverview key={patch.id} title={patch.title} description={patch.description} creator={patch.user} created_at={patch.created}  />
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
}

export default Patches;