import Footer from "@/app/components/Layout/Footer";
import Navbar from "@/app/components/Layout/Navbar";

export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}