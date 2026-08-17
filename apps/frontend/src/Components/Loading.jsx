export default function Loading({text, img}) {
    return (
        <div className="justify-items-center content-center items-center h-[calc(100vh-60px)] grid">
            <p>{text}</p>
            <img src={img} className="animate-spin [--animate-duration:1000ms] loading-img" width="100px" height="100px" />
        </div>
    )
}