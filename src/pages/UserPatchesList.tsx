import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';

import { PatchSortingOptionsType, Patch } from "../types";
import { PatchSortingOptions, PatchesPerPage } from "../constants";
import { fetchUserPatches } from "../services/patchService";
import { PatchOverview, PageController } from "../components";

const UserPatchesList: React.FC = () => {
    const id = useParams<{ id: string }>().id;
    const [posts, setPosts] = useState<Patch[]>([]);
    const [sort, setSort] = useState<string>("-created");

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previousPage, setPreviousPage] = useState<string | null>(null);

    const fetchPatches= async (page: number, id: number, sort?: string) => {
        const response = await fetchUserPatches(page, id, sort);
  
        setPosts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / PatchesPerPage));
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      };

    useEffect(() => {
        if (!id) {
            console.error("No user id provided");
            return;
        }

        fetchPatches(1, parseInt(id), "-created");
    }, [id]);

    const changeSorting = (sort: PatchSortingOptionsType) => {
        if (!id) {
            console.error("No user id provided");
            return;
        }

        const sorting = PatchSortingOptions[sort];

        setSort(sorting);
        fetchUserPatches(currentPage, parseInt(id), sorting);
    }
    const onPageChange = (page: number) => {
      setCurrentPage(page);
      fetchUserPatches(page);
    }
    const handleNext = () => {
      if (nextPage) {
        setCurrentPage(currentPage + 1);
        fetchUserPatches(currentPage + 1);
      }
    }
    const handlePrevious = () => {
      if (previousPage) {
        setCurrentPage(currentPage - 1);
        fetchUserPatches(currentPage - 1);
      }
    }

    return (
        <main className="flex flex-col gap-y-8 px-8 md:px-[11.25%]">
        <div id="Content" className="flex flex-row gap-x-9">
          <div id="PatchesCol" className="flex flex-col gap-y-8 md:w-[70%]">
            <div id="Title" className="flex flex-col lg:flex-row gap-y-2">
                <h1 className="boldheader3 text-text">Patch Database</h1>
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
                    {Object.keys(PatchSortingOptions).map((value, index) => {
                        const sortByKey = value as PatchSortingOptionsType;
                        return (
                        <p key={index} className={`basetext text-text cursor-pointer select-none ${ PatchSortingOptions[sortByKey] === sort? "opacity-100" : "opacity-70"}`} onClick={() => changeSorting(sortByKey)}>{value}</p>
                    );})}
                </div>
            </div>
            <div id="LatestUploads" className="flex flex-col gap-y-6">
              <h2 className="semiboldheader2 text-clr_primary">Recent uploads</h2>
              <div className="flex flex-col gap-y-4">
                {posts.map((patch, index) => (
                  <PatchOverview key={index} title={patch.title} description={patch.description} creator={patch.user} created_at={patch.created} upvotes={patch.upvotes}/>
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
        </div>
      </main>
    );
}

export default UserPatchesList;