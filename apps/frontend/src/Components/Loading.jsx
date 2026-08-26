export default function Loading({text, img, children}) {
    return (
        <div className="justify-items-center content-center items-center h-dvh grid z-[2] bg-bg">
            <p>{text}</p>
            {children}
            <img src={img} className="animate-spin [--animate-duration:1000ms] loading-img" width="100px" height="100px" />
        </div>
    )
}