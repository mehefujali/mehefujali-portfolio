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
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
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
    icon,
    skills,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    skills?: string[];
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200 space-y-2">
                <div className="font-sans font-bold text-neutral-200 text-xl">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-400 text-sm">
                    {description}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {skills?.map((skill, index) => (
                        <span key={index} className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors duration-200 cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};