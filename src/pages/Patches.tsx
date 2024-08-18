import React, { useState, useEffect} from "react";

import { Patch, PatchSortingOptionsType } from "../types";
import { PatchesPerPage, PatchSortingOptions } from "../constants";
import { fetchPatches } from "../services/patchService";
import { isLoggedIn } from "../utils/auth"; 
import { PatchOverview, AsideBox, Button, PageController, LoginModal } from "../components";

const Patches: React.FC = () => {
    const [posts, setPosts] = useState<Patch[]>([]);
    const [sort, setSort] = useState<string>("-created");
    const [sortTitle, setSortTitle] = useState<PatchSortingOptionsType>("New");
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

    const loggedIn = isLoggedIn();

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

    const changeSorting = (sort: PatchSortingOptionsType) => {
        const sorting = PatchSortingOptions[sort];

        setSort(sorting);
        setSortTitle(sort);
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
        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(!showLoginModal)}/>
        <div id="Content" className="flex flex-row gap-x-9">
          <div id="PatchesCol" className="flex flex-col gap-y-8 md:w-[70%]">
            <div id="Title" className="flex flex-col lg:flex-row gap-y-2">
                <h1 className="boldheader3 text-text">Patch Database</h1>
                {loggedIn &&
                <div className="flex flex-row gap-x-4 lg:ml-auto">
                  <Button variant="primary" text="New Patch" link="/patches/new" className="max-w-28"/>
                  <Button variant="accent" text="Your Patches" link="/profile/me/patches" className="max-w-32"/>
                </div>
                }
                {!loggedIn && 
                <div className="flex flex-row gap-x-4 lg:ml-auto">
                  <Button variant="primary" text="New Patch" className="max-w-28" onClick={() => setShowLoginModal(!showLoginModal)}/>
                  <Button variant="accent" text="Your Patches" className="max-w-32" onClick={() => setShowLoginModal(!showLoginModal)}/>
                </div>
                }
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
          <aside id="AsideCol" className="hidden md:w-[28%] md:flex flex-col gap-y-8">
            <AsideBox variant="register" />
            <AsideBox variant="statistics" />
          </aside>
        </div>
      </main>
    );
}

export default Patches;