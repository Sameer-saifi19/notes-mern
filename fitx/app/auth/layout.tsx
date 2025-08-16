export default function AuthLayout({children}: {children: React.ReactNode}){
    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <div className="max-w-sm w-full">
                    {children}
                </div>
            </div>
        </>
    )
}