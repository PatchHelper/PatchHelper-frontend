import React, { useState, useEffect} from "react";

import { Patch } from "../types";
import { PatchesPerPage } from "../constants";
import { fetchPatches } from "../services/patchService";
import { PatchOverview, AsideBox, Button, PageController } from "../components";

const SortingOptions = {
  "New": "-created",
  "Recent": "-updated",
  "Top Rated": "-upvotes",
  "Most Downloaded": "-downloads"
}
type SortBy = keyof typeof SortingOptions;

const Patches: React.FC = () => {
    const [posts, setPosts] = useState<Patch[]>([]);
    const [sort, setSort] = useState<string>("-created");

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    
    const fetchPosts = async (page: number, sort?: string) => {
      const response = await fetchPatches(page, sort);

      setPosts(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    };

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetchPatches(currentPage);
  
          setPosts(response.data.results);
          setTotalPages(Math.ceil(response.data.count / PatchesPerPage));
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
        };
  
        fetchPosts();
    }, [currentPage]);

    const changeSorting = (sort: SortBy) => {
        const sorting = SortingOptions[sort];

        setSort(sorting);
        fetchPosts(currentPage, sorting);
    }
    const onPageChange = (page: number) => {
      setCurrentPage(page);
      fetchPosts(page);
    }
    const handleNext = () => {
      if (nextPage) {
        setCurrentPage(currentPage + 1);
        fetchPosts(currentPage + 1);
      }
    }
    const handlePrevious = () => {
      if (previousPage) {
        setCurrentPage(currentPage - 1);
        fetchPosts(currentPage - 1);
      }
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
                <div className={`flex flex-row justify-center ${totalPages===1? "hidden" : "visible"}`}>
                  <PageController 
                    totalPages={totalPages} 
                    currentPage={currentPage} 
                    onPageChange={onPageChange}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    hasNext={!!nextPage}
                    hasPrevious={!!previousPage}
                  />
                </div>
                <div id="SortBy" className="flex flex-row bg-background2 gap-x-6 p-4">
                    
                    {Object.keys(SortingOptions).map((value, index) => {
                        const sortByKey = value as SortBy;
                        return (
                        <p key={index} className={`basetext text-text cursor-pointer select-none ${ SortingOptions[sortByKey] === sort? "opacity-100" : "opacity-70"}`} onClick={() => changeSorting(sortByKey)}>{value}</p>
                    );})}
                </div>
            </div>
            <div id="LatestUploads" className="flex flex-col gap-y-6">
              <h2 className="semiboldheader2 text-clr_primary">Recent uploads</h2>
              <div className="flex flex-col gap-y-4">
                {posts.map((patch, index) => (
                  <PatchOverview key={index} title={patch.title} description={patch.description} creator={patch.user} created_at={patch.created}  />
                ))}
              </div>
            </div>
            <div className={`flex flex-row justify-center ${totalPages===1? "hidden" : "visible"}`}>
                  <PageController 
                    totalPages={totalPages} 
                    currentPage={currentPage} 
                    onPageChange={onPageChange}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    hasNext={!!nextPage}
                    hasPrevious={!!previousPage}
                  />
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