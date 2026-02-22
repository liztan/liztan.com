"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

interface DocumentationCardProps {
  isHovered?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function DocumentationCard({
  isHovered: externalHover,
  onMouseEnter,
  onMouseLeave,
}: DocumentationCardProps) {
  const { resolvedTheme } = useTheme()
  const [internalHover, setInternalHover] = useState(false)
  const [animationStage, setAnimationStage] = useState(0) // 0: logo, 1: circle, 2: scattered shapes, 3: organized grid

  // Use external hover state if provided, otherwise use internal
  const isHovered = externalHover !== undefined ? externalHover : internalHover

  useEffect(() => {
    if (isHovered) {
      // Stage 1: Show circle (600ms)
      const timer1 = setTimeout(() => setAnimationStage(1), 600)
      // Stage 2: Circle becomes scattered shapes (1200ms)
      const timer2 = setTimeout(() => setAnimationStage(2), 1200)
      // Stage 3: Shapes organize into grid (2000ms)
      const timer3 = setTimeout(() => setAnimationStage(3), 2000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    } else {
      setAnimationStage(0)
    }
  }, [isHovered])

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => {
        setInternalHover(true)
        onMouseEnter?.()
      }}
      onMouseLeave={() => {
        setInternalHover(false)
        onMouseLeave?.()
      }}
    >
      <div className="relative flex items-center justify-center h-full">
        {/* Mailchimp Logo */}
        <div
          className="absolute transition-all duration-500 ease-out"
          style={{
            opacity: isHovered ? 0 : 1,
          }}
        >
          <Image
            src={resolvedTheme === 'dark' ? '/images/mailchimp-logo-dark.svg' : '/images/mailchimp-logo.svg'}
            alt="Mailchimp"
            width={48}
            height={50}
            className="w-12 h-12"
          />
        </div>

        {/* Hidden inline SVG kept for animation reference only */}
        <div className="hidden">
          <svg
            width="48"
            height="50"
            viewBox="0 0 95 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <g clipPath="url(#clip0_27_148)">
              <path
                d="M90.3019 59.8525C91.1066 60.288 91.8171 60.8794 92.3922 61.5922C93.2863 62.6893 94.3477 64.6378 94.3477 67.6833C94.3477 71.916 92.727 76.423 92.233 77.7001C92.2207 77.7247 92.2003 77.7492 92.2003 77.7779C89.3557 84.6484 84.3872 90.4222 78.0257 94.2501C71.808 97.9957 64.2593 99.981 56.2004 99.981H54.7021C47.1404 99.823 39.759 97.6363 33.3258 93.6484C27.6616 90.0835 23.0798 85.0307 20.078 79.0387C16.614 78.4989 13.3806 76.9632 10.7697 74.6177C7.42613 71.6458 5.35628 67.757 4.94802 63.6635C4.72605 61.5935 4.84606 59.5009 5.3032 57.4701L3.88248 56.2625C1.59625 54.3263 0.261252 51.5386 0.0285461 48.2638C-0.163334 45.5375 0.375563 42.4265 1.62891 38.9879C4.5561 30.981 11.276 21.4432 19.6125 13.4773C23.3335 9.85324 27.4613 6.67452 31.9133 4.00491C36.5021 1.34823 40.6663 0.00147058 44.2916 0.0178446C47.1308 -0.0566759 49.8959 0.931243 52.0484 2.78914C52.1677 2.87684 53.9169 4.59496 55.3016 5.95505L55.4124 6.06394L56.0207 5.80605C60.6177 3.89438 65.1412 2.88739 69.1053 2.88739C77.4582 2.88739 82.8717 7.39023 82.8717 14.3492C82.8717 18.6432 80.7773 23.4572 76.903 28.1238C77.9594 29.7651 78.7567 31.5601 79.2668 33.4453C79.8173 35.3675 80.1178 37.3529 80.1609 39.3522C80.2017 40.2119 80.2384 41.5832 80.2711 42.8112C82.8268 43.5726 86.0357 44.858 87.9626 46.9047C89.4556 48.3892 90.4344 50.3147 90.7551 52.3982C91.0734 54.4515 90.7556 56.5533 89.8447 58.4198C89.9264 58.6531 90.0243 58.9437 90.0978 59.177C90.1713 59.4104 90.2407 59.6355 90.3019 59.8525Z"
                fill="currentColor"
              />
              <path
                className="fill-background"
                d="M21.1151 51.8922C20.4039 51.854 19.6907 51.9049 18.9921 52.0436C13.9338 53.067 11.0761 57.3652 11.6435 62.9855C12.1498 68.0574 17.2693 72.3351 22.005 72.462C22.4917 72.4752 22.9784 72.4409 23.4584 72.3596C28.5779 71.4836 29.9252 65.9042 29.0801 60.4189C28.1248 54.2295 23.9483 52.0477 21.1151 51.8922ZM26.1284 66.5592C25.9209 66.896 25.6237 67.168 25.2702 67.3445C24.9167 67.521 24.5211 67.5949 24.128 67.558C23.0338 67.472 21.8132 66.6738 21.6458 64.6925C21.6343 63.7315 21.8104 62.7776 22.1643 61.8844C22.3859 61.3245 22.4087 60.7053 22.2288 60.1306C22.0489 59.5559 21.6772 59.0607 21.1763 58.7283C20.8783 58.5322 20.5443 58.3976 20.1938 58.3322C19.8434 58.2668 19.4834 58.2721 19.135 58.3476C18.7939 58.4198 18.4706 58.5595 18.1839 58.7584C17.8972 58.9573 17.6529 59.2115 17.4653 59.5061C17.2018 59.9588 16.9961 60.4429 16.8529 60.947C16.8284 61.037 16.8039 61.1066 16.7875 61.1516C16.5548 61.7779 16.1833 61.9703 15.9343 61.9253C15.8159 61.9253 15.6526 61.8312 15.5465 61.5446C15.2729 60.7505 15.5138 58.5359 16.9753 56.8985C17.458 56.3818 18.0561 55.9874 18.7204 55.7476C19.3847 55.5078 20.0962 55.4294 20.7966 55.519C21.5381 55.62 22.2429 55.904 22.8479 56.3456C23.4528 56.7871 23.939 57.3724 24.2627 58.0488C25.267 59.9645 24.3729 61.9744 23.8544 63.1779L23.6993 63.5341C23.3645 64.3323 23.3482 65.0282 23.6503 65.4948C23.7775 65.6782 23.9483 65.827 24.1471 65.9277C24.3459 66.0285 24.5666 66.0781 24.7893 66.072C24.9991 66.0707 25.2077 66.0418 25.4099 65.9861C25.6712 65.9247 25.9447 65.8592 26.1121 66.0679C26.1675 66.137 26.199 66.2222 26.202 66.3108C26.2049 66.3994 26.1791 66.4865 26.1284 66.5592Z"
              />
              <path
                className="fill-background"
                d="M92.3922 61.5922C91.8171 60.8794 91.1066 60.288 90.3019 59.8525C90.2407 59.6355 90.1713 59.4104 90.0978 59.177C90.0243 58.9437 89.9263 58.6531 89.8447 58.4198C90.7556 56.5533 91.0734 54.4515 90.7551 52.3982C90.4344 50.3147 89.4556 48.3892 87.9626 46.9047C86.0357 44.858 82.8268 43.5726 80.2711 42.8113C80.2384 41.5832 80.2017 40.2119 80.1609 39.3522C80.1178 37.3529 79.8173 35.3675 79.2668 33.4453C78.7567 31.5601 77.9594 29.7651 76.903 28.1238C80.7773 23.4572 82.8717 18.6432 82.8717 14.3492C82.8717 7.39023 77.4582 2.88739 69.1053 2.88739C65.1412 2.88739 60.6177 3.89439 56.0207 5.80605L55.4124 6.06394C54.0121 4.68852 52.1709 2.8792 52.0484 2.78914C49.8959 0.931243 47.1308 -0.0566759 44.2916 0.0178446C40.6663 0.00147058 36.5021 1.34823 31.9133 4.00491C27.4613 6.67452 23.3335 9.85324 19.6125 13.4773C11.276 21.4432 4.5561 30.981 1.62891 38.9879C0.375563 42.4265 -0.163334 45.5375 0.0285461 48.2638C0.261252 51.5386 1.59625 54.3263 3.88248 56.2625L5.3032 57.4701C4.84606 59.5009 4.72605 61.5935 4.94802 63.6635C5.35628 67.757 7.42613 71.6458 10.7697 74.6177C13.3806 76.9632 16.614 78.499 20.078 79.0387C23.0798 85.0307 27.6616 90.0835 33.3258 93.6484C39.759 97.6363 47.1404 99.823 54.7021 99.981C55.2001 99.981 55.7023 99.981 56.2004 99.981C64.2593 99.981 71.808 97.9957 78.0257 94.2501C84.3872 90.4222 89.3557 84.6484 92.2003 77.7779C92.2003 77.7492 92.2207 77.7247 92.233 77.7001C92.727 76.423 94.3477 71.916 94.3477 67.6833C94.3477 64.6378 93.2863 62.6893 92.3922 61.5922ZM89.1751 76.5212C83.6555 89.78 70.4852 97.1606 54.8001 96.6939C40.1764 96.2559 27.7042 88.5069 22.2458 75.9072C18.943 75.9072 15.5422 74.454 12.9539 72.1575C10.2308 69.7342 8.56924 66.6027 8.22223 63.332C7.95859 60.9776 8.24944 58.5941 9.0714 56.373L6.00948 53.7695C-8.01816 41.8984 35.8529 -7.00659 49.8887 5.26571L54.6735 9.96913C54.6735 9.96913 57.2659 8.86389 57.2823 8.8557C69.5871 3.73064 79.5771 6.19902 79.6056 14.3533C79.6056 18.5941 76.9152 23.535 72.6 28.0214C74.1636 29.4787 75.4169 31.7547 76.1355 34.3541C76.6114 36.0206 76.8694 37.7419 76.903 39.4751C76.9765 41.2025 77.0581 45.2059 77.0663 45.3001L78.8014 45.7831C82.1042 46.7123 84.4557 47.9486 85.6029 49.1603C86.6359 50.1676 87.3125 51.4857 87.5299 52.914C87.7258 54.0233 87.6973 55.98 86.2398 58.166C86.5173 58.8212 86.7558 59.4924 86.9542 60.1759C87.3176 61.3425 87.5789 62.3127 87.6197 62.4559C88.9547 62.4559 91.0531 63.9992 91.0531 67.7161C91.0531 71.433 89.5344 75.592 89.1751 76.5212Z"
              />
              <path
                className="fill-background"
                d="M86.9539 65.4677C86.4824 65.2033 85.937 65.1025 85.4025 65.1812C85.118 63.4413 84.6202 61.7433 83.9206 60.1257C80.6831 62.6882 76.5107 64.4935 73.3386 65.4063C68.7408 66.7012 63.9602 67.22 59.1926 66.9414C56.1225 66.6917 54.0935 65.7911 53.33 68.2799C60.3398 70.8548 67.7618 69.7536 67.7618 69.7536C67.796 69.7496 67.8305 69.7526 67.8635 69.7622C67.8965 69.7719 67.9272 69.7881 67.9538 69.8098C67.9805 69.8316 68.0025 69.8584 68.0186 69.8889C68.0347 69.9193 68.0446 69.9526 68.0476 69.9869C68.0536 70.0442 68.0414 70.1019 68.0128 70.1519C67.9843 70.2019 67.9407 70.2415 67.8884 70.2653C67.8884 70.2653 62.1728 72.922 53.13 70.1138C53.3831 72.2424 55.453 73.1962 56.4409 73.581C57.2872 73.8972 58.1604 74.1356 59.0497 74.2933C70.2685 76.2295 80.7607 69.7905 83.1367 68.1776C83.3123 68.0548 83.4307 68.1776 83.2878 68.3864C83.2183 68.5014 83.1419 68.6121 83.0592 68.7179C80.1687 72.4553 72.3955 76.7862 62.2871 76.7821C57.878 76.7821 53.4729 75.2266 51.8521 72.8319C49.3414 69.1191 51.7297 63.6993 55.9102 64.2642L57.7433 64.4689C62.973 65.0543 70.5421 64.3215 76.7802 61.4152C82.4958 58.7585 84.6432 55.8357 84.3207 53.4697C84.2118 52.7352 83.8662 52.0567 83.3368 51.5375C82.312 50.5305 80.6831 49.7446 77.9396 48.975C77.0333 48.7171 76.4168 48.5657 75.7555 48.3364C74.5797 47.9271 73.9959 47.6324 73.8652 45.4137C73.8081 44.4435 73.6366 41.0582 73.5754 39.6582C73.4692 37.2021 73.1671 33.8618 71.1014 32.4782C70.568 32.1351 69.9508 31.9454 69.3173 31.9297C68.9644 31.9089 68.6104 31.9434 68.2681 32.032C67.0841 32.2326 66.386 32.8507 65.5124 33.5958C62.9281 35.753 60.7439 36.1092 58.3148 36.0027C56.8655 35.9413 55.3305 35.7162 53.5668 35.5934L52.538 35.5361C48.4555 35.3273 44.1116 38.8477 43.3849 43.8459C42.3766 50.8048 47.4022 54.403 48.8556 56.5111C49.0816 56.7791 49.2236 57.1081 49.2638 57.4567C49.2254 57.8441 49.0398 58.2018 48.7453 58.4556C44.5975 62.7333 43.2706 69.5285 44.8342 75.1898C45.0249 75.8904 45.2706 76.5748 45.5691 77.2365C49.2434 85.8329 60.6133 89.8322 71.7301 86.189C73.178 85.7054 74.5832 85.1016 75.931 84.3838C78.3625 83.1757 80.5539 81.5333 82.3978 79.5371C85.2586 76.6643 87.1429 72.96 87.7827 68.9513C88.1256 66.7244 87.6357 65.8771 86.9539 65.4677ZM71.9873 51.2387C71.9873 52.1557 71.4198 52.8761 70.7625 52.8761C70.1052 52.8761 69.5704 52.1106 69.5827 51.1937C69.5949 50.2767 70.1542 49.5563 70.8074 49.5563C71.4606 49.5563 72.0199 50.3259 72.0036 51.2387H71.9873ZM68.9499 40.4114C70.2481 40.2027 70.8727 41.5453 71.3382 43.7722C71.6484 45.2663 71.5872 46.6376 71.2443 47.4359C70.6033 47.3519 69.9542 47.3519 69.3132 47.4359C68.693 46.544 68.2749 45.5269 68.0884 44.4558C67.6067 42.233 67.6557 40.6202 68.9499 40.4114ZM64.6019 52.3644C64.8959 51.7627 65.7981 51.603 66.6187 52.0083C67.4393 52.4136 67.868 53.2364 67.574 53.8258C67.2801 54.4153 66.3738 54.5831 65.5573 54.1779C64.7407 53.7726 64.308 52.9621 64.6019 52.3644ZM59.5233 51.689C59.3885 51.8978 59.115 51.8609 58.4945 51.7913C57.1853 51.593 55.8473 51.7339 54.6079 52.2007C54.3254 52.3193 54.0291 52.4019 53.726 52.4463C53.6529 52.4455 53.5823 52.4195 53.526 52.3726C53.4956 52.3448 53.4718 52.3105 53.4563 52.2722C53.4407 52.234 53.4339 52.1928 53.4362 52.1516C53.5051 51.7795 53.716 51.4491 54.0241 51.2305C54.6796 50.691 55.4789 50.3564 56.3225 50.2686C57.9882 50.068 59.2048 50.8457 59.4906 51.3083C59.5335 51.3612 59.5595 51.4257 59.5654 51.4936C59.5712 51.5615 59.5565 51.6296 59.5233 51.689ZM50.2477 49.3966C50.0313 49.3639 49.9374 49.2698 49.9089 49.1469C49.8272 48.7663 50.4151 48.1318 51.0356 47.6774C51.9406 47.0135 53.0007 46.5943 54.114 46.4603C55.2272 46.3262 56.3562 46.4817 57.3922 46.9119C58.3598 47.3133 59.1917 47.9854 59.7886 48.8481C60.0091 49.2084 60.0499 49.4908 59.907 49.6382C59.6866 49.8756 59.115 49.6054 58.1883 49.1961C57.0749 48.647 55.8438 48.3813 54.6038 48.4224C52.5462 48.5493 50.758 49.454 50.2477 49.3966Z"
              />
              <path
                className="fill-background"
                d="M64.3678 24.1496C64.5474 24.1905 64.6617 23.8835 64.5025 23.7935C61.8667 22.4217 58.9584 21.658 55.9904 21.5584C55.9616 21.5582 55.9334 21.55 55.909 21.5347C55.8846 21.5193 55.8649 21.4975 55.8522 21.4715C55.8395 21.4456 55.8342 21.4166 55.837 21.3879C55.8398 21.3591 55.8505 21.3317 55.8679 21.3087C56.3311 20.7051 56.8704 20.1644 57.4723 19.7C57.499 19.6783 57.5181 19.6487 57.5271 19.6154C57.536 19.5821 57.5342 19.5469 57.522 19.5147C57.5098 19.4825 57.4878 19.455 57.4591 19.4361C57.4304 19.4172 57.3964 19.4078 57.3621 19.4093C53.7246 19.6345 49.5726 21.3824 47.1843 23.0157C47.1582 23.0333 47.1274 23.0425 47.096 23.0422C47.0645 23.0418 47.0339 23.0318 47.0082 23.0136C46.9826 22.9954 46.963 22.9698 46.9522 22.9402C46.9413 22.9106 46.9397 22.8784 46.9475 22.8479C47.1926 21.9284 47.5534 21.0439 48.0212 20.2158C48.0369 20.1875 48.0431 20.1548 48.039 20.1227C48.0348 20.0906 48.0205 20.0607 47.9981 20.0373C47.9757 20.014 47.9465 19.9984 47.9146 19.993C47.8828 19.9875 47.8501 19.9924 47.8212 20.007C43.9836 21.976 39.7051 25.4759 36.2268 29.508C36.2026 29.5377 36.19 29.575 36.191 29.6133C36.1921 29.6516 36.2068 29.6882 36.2325 29.7165C36.2583 29.7448 36.2933 29.7628 36.3312 29.7674C36.3691 29.7719 36.4074 29.7627 36.4391 29.7413C39.4397 27.5472 43.559 25.5127 48.9521 24.1946C54.022 23.0183 59.2911 23.0029 64.3678 24.1496Z"
              />
              <path
                className="fill-background"
                d="M51.3869 11.6787C51.3869 11.6787 47.5656 7.2373 46.4144 6.90982C39.3189 4.98997 23.9971 15.5839 14.2153 29.5837C10.2593 35.245 4.59272 45.2782 7.29945 50.436C7.63422 51.0745 9.52444 52.716 10.5369 53.5675C12.3553 51.0211 15.0875 49.2809 18.159 48.7126C22.1681 37.9017 28.8594 27.9627 37.7185 21.1224C42.006 17.6005 46.5779 14.4417 51.3869 11.6787Z"
              />
            </g>
            <defs>
              <clipPath id="clip0_27_148">
                <rect width="95" height="100" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Morphing shape - circle transition */}
        <div
          className="absolute bg-foreground transition-all duration-700 ease-out"
          style={{
            width: animationStage >= 1 ? "48px" : "48px",
            height: animationStage >= 1 ? "48px" : "48px",
            borderRadius: "50%",
            opacity: animationStage >= 1 && animationStage < 2 ? 1 : 0,
            transform: "translateX(0px) translateY(0px)",
          }}
        />

        {/* Grid Pattern - Black circles and squares with more spacing */}

        {/* Row 1 */}
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(-35px) translateY(-40px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(40px) translateY(-30px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(-25px) translateY(35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(30px) translateY(25px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Row 2 */}
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(-40px) translateY(15px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(45px) translateY(-15px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(-30px) translateY(-20px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(20px) translateY(40px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Row 3 */}
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(35px) translateY(-35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(-45px) translateY(-10px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(25px) translateY(-25px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(-20px) translateY(30px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Row 4 */}
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(40px) translateY(35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(-35px) translateY(20px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(15px) translateY(-40px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(-15px) translateY(-35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}
