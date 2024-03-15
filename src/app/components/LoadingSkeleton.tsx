const LoadingSkeleton = () => {
    return (
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
            <section className="space-y-4">
                <div className="space-y-2">
                    <h2 className="flex gap-1 text-2xl items-end">
                        {/* Placeholder for date */}
                        <div className="animate-pulse h-6 w-40 bg-gray-300/40"></div>
                        {/* Placeholder for time */}
                        <div className="animate-pulse h-4 w-20 bg-gray-300/40"></div>
                    </h2>
                    <ContainerSkeleton/>
                </div>
                <div className="flex gap-4">
                    <ContainerSkeleton/>
                    <ContainerSkeleton/>
                </div>
            </section>
            <section className="flex w-full flex-col gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map(index => (
                    <ForecastWeatherDetailSkeleton key={index}/>
                ))}
            </section>
        </main>
    );
};

const ContainerSkeleton = () => (
    <div className="animate-pulse bg-gray-300/40 rounded-lg p-4">
        {/* Placeholder for temperature */}
        <div className="h-16 w-full bg-gray-300/40 animate-pulse rounded-lg mb-4"></div>
        {/* Placeholder for hourly weather */}
        <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map(index => (
                <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    {/* Placeholder for time */}
                    <div className="h-4 w-16 bg-gray-300/40 animate-pulse"></div>
                    {/* Placeholder for weather icon */}
                    <div className="h-8 w-8 bg-gray-300/40 animate-pulse rounded-full"></div>
                    {/* Placeholder for temperature */}
                    <div className="h-4 w-12 bg-gray-300/40 animate-pulse"></div>
                </div>
            ))}
        </div>
    </div>
);

const ForecastWeatherDetailSkeleton = () => (
    <div className="animate-pulse bg-gray-300/40 rounded-lg p-4">
        {/* Placeholder for date */}
        <div className="h-6 w-20 bg-gray-300/40 animate-pulse rounded-lg mb-4"></div>
        {/* Placeholder for weather details */}
        <div className="flex items-center justify-between">
            {/* Placeholder for time */}
            <div className="h-4 w-16 bg-gray-300/40 animate-pulse"></div>
            {/* Placeholder for weather icon */}
            <div className="h-8 w-8 bg-gray-300/40 animate-pulse rounded-full"></div>
            {/* Placeholder for temperature */}
            <div className="h-4 w-12 bg-gray-300/40 animate-pulse"></div>
        </div>
    </div>
);

export default LoadingSkeleton