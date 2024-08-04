import React from "react";

interface InfoCardProps {
    title?: string;
    content?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({title, content}) => {
    return (
        <div className="flex flex-col justify-start gap-y-2 bg-clr_primary p-4 rounded-2xl md:max-w-lg" data-aos="fade-up">
            <h3 className="semiboldheader3 text-text_secondary">
                {title}
            </h3>
            <p className="basetext text-text_secondary">
                {content}
            </p>
        </div>
    );
};

export default InfoCard;