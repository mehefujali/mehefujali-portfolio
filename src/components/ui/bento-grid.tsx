import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    skills,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    skills?: string[];
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className={cn(
                "row-span-1 card-ui group/bento flex flex-col justify-between p-5",
                className
            )}
        >
            {/* Header with Icon */}
            <div className="flex justify-center items-center mb-4 min-h-[8rem]">
                {header}
            </div>

            {/* Title, Description, and Skills */}
            <div className="transition duration-200 space-y-3">
                <h3 className="font-bold text-xl text-slate-50">{title}</h3>
                <p className="font-normal text-sm text-slate-400 leading-relaxed">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {skills?.map((skill, index) => (
                        <span key={index} className="bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200 cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};