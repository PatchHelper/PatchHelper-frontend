import React from "react";

import { Previous, Next } from "../img";

interface PageControllerProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

const PageController: React.FC<PageControllerProps> = ({totalPages, currentPage, onPageChange, onNext, onPrevious, hasNext, hasPrevious}) => {
    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };
    
    return (
        <div className="flex flex-row gap-x-3">
            <Previous className={`w-6 h-6 ${hasPrevious? "opacity-100 cursor-pointer" : "opacity-70 cursor-default"}`} onClick={hasPrevious? onPrevious : () => null}/>
            <div className="flex flex-row gap-x-2">
                {Array.from({length: totalPages}, (_, i) => i+1).map((value, index) => (
                    <p 
                      key={index} 
                      className={`basetext text-text cursor-pointer select-none ${value === currentPage? "opacity-100" : "opacity-70"}`} 
                      onClick={() => handlePageClick(value)}
                    >
                        {value}
                    </p>
                ))}
            </div>
            <Next className={`w-6 h-6 ${hasNext? "opacity-100 cursor-pointer" : "opacity-70 cursor-default"}`} onClick={hasNext? onNext : () => null}/>
        </div>
    );
}

export default PageController;