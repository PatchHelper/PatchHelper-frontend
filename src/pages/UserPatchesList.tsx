import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';

import { PatchSortingOptionsType, Patch, User } from "../types";
import { PatchSortingOptions, PatchesPerPage } from "../constants";
import { fetchUserPatches } from "../services/patchService";
import { getUserDetails } from "../services/profileService";
import { PatchOverview, PageController } from "../components";
import { set } from "date-fns";

const UserPatchesList: React.FC = () => {
    const { userID="" } = useParams();
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Patch[]>([]);
    const [sort, setSort] = useState<string>("-created");
    const [sortTitle, setSortTitle] = useState<PatchSortingOptionsType>("New");

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previousPage, setPreviousPage] = useState<string | null>(null);

    const fetchPatches= async (page: number, id: string, sort?: string) => {
        const response = await fetchUserPatches(page, id, sort);
  
        setPosts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / PatchesPerPage));
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      };

    useEffect(() => {
        if (!userID) {
            console.error("No user id provided");
            return;
        }
        const fetchUser = async () => {
          const response = await getUserDetails(parseInt(userID));
          
          if (response) {setUser(response.data)}
        }

        fetchUser();
        fetchPatches(1, userID, "-created");
    }, [userID]);

    const changeSorting = (sort: PatchSortingOptionsType) => {
        if (!userID) {
            console.error("No user id provided");
            return;
        }

        const sorting = PatchSortingOptions[sort];

        setSort(sorting)
        setSortTitle(sort);
        fetchPatches(currentPage, userID, sorting);
    }
    const onPageChange = (page: number) => {
      setCurrentPage(page);
      fetchPatches(page, userID, sort);
    }
    const handleNext = () => {
      if (nextPage) {
        setCurrentPage(currentPage + 1);
        fetchPatches(currentPage + 1, userID, sort);
      }
    }
    const handlePrevious = () => {
      if (previousPage) {
        setCurrentPage(currentPage - 1);
        fetchPatches(currentPage - 1, userID, sort);
      }
    }

    if (!userID) {
      return (
        <p>Loading</p>
      )
    }

    return (
        <main className="flex flex-col gap-y-8 px-8 md:px-[11.25%]">
        <div id="Content" className="flex flex-row gap-x-9">
          <div id="PatchesCol" className="flex flex-col gap-y-8 md:w-[70%]">
            <div id="Title" className="flex flex-col lg:flex-row gap-y-2">
                <h1 className="boldheader3 text-text">{user?.username}'s Patches</h1>
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
              <h2 className="semiboldheader2 text-clr_primary">{sortTitle} uploads</h2>
              <div className="flex flex-col gap-y-4">
                {posts.map((patch, index) => (
                  <PatchOverview key={index} patch={patch}/>
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