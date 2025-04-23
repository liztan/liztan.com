import Link from "next/link"

export function GalleryHeading() {
  return (
    <div className="mt-24 mb-36">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        <div className="md:w-1/3">
          <h1 className="text-3xl md:text-4xl font-mono mb-2">LIZ TAN</h1>
          <p className="text-sm text-muted-foreground">Product Designer</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-xl font-light leading-relaxed">
            Currently at{" "}
            <Link href="https://squareup.com" className="text-primary hover:underline" target="_blank">
              Square
            </Link>{" "}
            working on Growth. I solve problems that help our products reach more people.
          </p>
        </div>
      </div>
    </div>
  )
}
