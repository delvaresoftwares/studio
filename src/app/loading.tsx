import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
            <div className="flex flex-col items-center justify-center gap-6">
                <Image
                    src="/assets/loading.gif"
                    alt="Loading Delvare..."
                    width={100}
                    height={100}
                    className="object-contain"
                    unoptimized
                />
                <h2 className="text-xl font-bold font-headline tracking-wider text-primary animate-pulse">
                    INITIALIZING...
                </h2>
            </div>
        </div>
    );
}
