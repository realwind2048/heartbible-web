import Link from "next/link";

export async function Navbar() {
    console.log('Navbar');
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-8">
                    <Link href="/" className="flex items-center rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">마음말씀</span>
                        <img src="/images/icon/ic_app_icon_transparent_bg.png" className="h-8" alt="Flowbite Logo" />
                    </Link>
                </div>
            </nav>
        </>
    );
}
