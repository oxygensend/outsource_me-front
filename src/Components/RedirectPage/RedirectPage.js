import {ButtonLink} from "../Button/ButtonLink";

export const RedirectPage = ({statusCode, info, content, route, buttonValue}) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:py-12">
                <div className="lg:gap-4 lg:flex">
                    <div
                        className="flex flex-col items-center justify-center md:py-24 lg:py-32"
                    >
                        <h1 className="font-bold text-red-600 text-9xl">{statusCode}</h1>
                        <p
                            className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
                        >
                            <span className="text-red-500">Oops!</span> {info}
                        </p>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            {content}
                        </p>

                        <ButtonLink
                            route={route}
                            value={buttonValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}