"use client";

import Link from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css/core';

// -------------------------------------------------------------
// CLIENT & PARTNER LOGOS (Update these with Cloudinary URLs!)
// -------------------------------------------------------------
const clients = [
  { id: 1, name: "Pradhan Packers and Movers", logoUrl: "https://www.pradhanservice.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon.070f0f0f.png&w=3840&q=75", link: "https://www.pradhanservice.com/" },
  { id: 2, name: "Gautam Buddha Institute", logoUrl: "https://thegautambuddhainstitution.com/logo.png", link: "https://thegautambuddhainstitution.com" },
  { id: 3, name: "NameCheap", logoUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjU4IDQ2LjU3Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1OS45OSIgeTE9IjQ0LjE2IiB4Mj0iODAuMDEiIHkyPSIxLjIzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDQyMDJjIi8+PHN0b3Agb2Zmc2V0PSIwLjEiIHN0b3AtY29sb3I9IiNkYzNkMjkiIHN0b3Atb3BhY2l0eT0iMC43OSIvPjxzdG9wIG9mZnNldD0iMC4yIiBzdG9wLWNvbG9yPSIjZTQ1OTI2IiBzdG9wLW9wYWNpdHk9IjAuNTgiLz48c3RvcCBvZmZzZXQ9IjAuMzIiIHN0b3AtY29sb3I9IiNlYTcxMjMiIHN0b3Atb3BhY2l0eT0iMC40Ii8+PHN0b3Agb2Zmc2V0PSIwLjQzIiBzdG9wLWNvbG9yPSIjZjA4NTIxIiBzdG9wLW9wYWNpdHk9IjAuMjUiLz48c3RvcCBvZmZzZXQ9IjAuNTUiIHN0b3AtY29sb3I9IiNmNDk0MWYiIHN0b3Atb3BhY2l0eT0iMC4xNCIvPjxzdG9wIG9mZnNldD0iMC42OCIgc3RvcC1jb2xvcj0iI2Y3OWYxZSIgc3RvcC1vcGFjaXR5PSIwLjA2Ii8+PHN0b3Agb2Zmc2V0PSIwLjgyIiBzdG9wLWNvbG9yPSIjZjhhNTFkIiBzdG9wLW9wYWNpdHk9IjAuMDIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOWE3MWQiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMTc3Ny40OCIgeTE9IjEwNDguNzYiIHgyPSIxNzk3LjUiIHkyPSIxMDA1LjgzIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MDMuNSAxMDUyLjYpIHJvdGF0ZSgxODApIiB4bGluazpocmVmPSIjYSIvPjwvZGVmcz48dGl0bGU+Y24tbG9nbzwvdGl0bGU+PHBhdGggZD0iTTc3LjE3LjcxYTcuODcsNy44NywwLDAsMC02Ljg4LDQuMDVsLS4xNi4zM0w2NCwxNy4yNWwtNy44LDE1LjM3LDUuMTEsMTAuMDcuMjguNTVBOCw4LDAsMCwwLDY1LDQ2LjQ3YTguMDUsOC4wNSwwLDAsMCwzLjQxLTMuMjNsLjI4LS41NUw4NCwxMi40OGwuMzctLjczYTcuODYsNy44NiwwLDAsMC03LjE5LTExWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjZmY1MTAwIi8+PHBhdGggZD0iTTI5Ljg1LDE1LjM0bC01LjEtMTAtLjI4LS41NWE3Ljg5LDcuODksMCwwLDAtMy40LTMuMjIsNy45Miw3LjkyLDAsMCwwLTMuNCwzLjIxbC0uMjkuNTZMMi4wNSwzNS41MmwtLjM3LjcyYTcuODYsNy44NiwwLDAsMCwxNC4wNiw3bC4xNy0uMzIsNi4xNy0xMi4xNkwyOS44NywxNS40WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjZmY1MTAwIi8+PHBhdGggZD0iTTc3LjE1LjcxYTcuODYsNy44NiwwLDAsMC02Ljg3LDQuMDVsLS4xNy4zM0w2My45NCwxNy4yNSw1Ni4xMywzMi42Mmw1LjEyLDEwLjA3LjI4LjU1YTcuOTQsNy45NCwwLDAsMCwzLjQxLDMuMjMsNy45NCw3Ljk0LDAsMCwwLDMuNDEtMy4yM2wuMjktLjU1TDg0LDEyLjQ4bC4zNi0uNzNhNy44Niw3Ljg2LDAsMCwwLTcuMTktMTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9InVybCgjYSkiLz48cGF0aCBkPSJNOC44Niw0Ny4yOWE3Ljg2LDcuODYsMCwwLDAsNi44Ny00bC4xNy0uMzMsNi4xOC0xMi4xNiw3LjgtMTUuMzdMMjQuNzcsNS4zMWwtLjI4LS41NWE4LDgsMCwwLDAtMy40Mi0zLjIzLDgsOCwwLDAsMC0zLjQxLDMuMjNsLS4yOC41NUwyLDM1LjUybC0uMzcuNzNhNy44Niw3Ljg2LDAsMCwwLDcuMTksMTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9InVybCgjYikiLz48cGF0aCBkPSJNMjkuODUsMTUuMzRsLTUuMS0xMC0uMjgtLjU1YTcuOTQsNy45NCwwLDAsMC0zLjQxLTMuMjNBOC4zMSw4LjMxLDAsMCwxLDIyLjU1LDFhOC4xNiw4LjE2LDAsMCwxLDItLjI1SDM1LjIzYTcuOTIsNy45MiwwLDAsMSw2Ljg2LDRsLjI4LjU1TDU2LjE4LDMyLjY2bDUuMDksMTAsLjI4LjU1QTgsOCwwLDAsMCw2NSw0Ni40N2E4LjA1LDguMDUsMCwwLDEtMy40Ny44MUg1MC43OWE3LjkxLDcuOTEsMCwwLDEtNi44NS00bC0uMjktLjU1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjZmY4YzQ0Ii8+PHBhdGggZD0iTTk4LDI0LjUzYS43Ni43NiwwLDAsMSwuODQtLjg0aC42YS43NS43NSwwLDAsMSwuOC44NHYxLjk0YTUuNzUsNS43NSwwLDAsMS0uMTMsMS4yMWguMDdhNy40Myw3LjQzLDAsMCwxLDYuOC00LjM5YzQuMTksMCw1LjY2LDIuMzgsNS42Niw2LjUzdjkuODlhLjc2Ljc2LDAsMCwxLS44NC44NGgtLjYzYS43NC43NCwwLDAsMS0uODEtLjg0VjMwLjQzYzAtMi42NS0uNDMtNS0zLjY4LTUtMy41OSwwLTYuNCwyLjk1LTYuNCw2Ljg4djcuNGEuNzQuNzQsMCwwLDEtLjgxLjg0aC0uNjNhLjc2Ljc2LDAsMCwxLS44NC0uODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9IiM2ZTZmNzEiLz48cGF0aCBkPSJNMTI0Ljg5LDMwLjIzaDF2LS41NGMwLTMuMjUtMS43OC00LjM2LTQuMTYtNC4zNmE4LDgsMCwwLDAtNC4wOSwxLjE4Ljc5Ljc5LDAsMCwxLTEuMTMtLjI3bC0uMjEtLjM0YS43Ni43NiwwLDAsMSwuMjQtMS4xNCwxMC4zNCwxMC4zNCwwLDAsMSw1LjM2LTEuNDdjNCwwLDYuMjcsMi4yNCw2LjI3LDYuNDd2MTBhLjc0Ljc0LDAsMCwxLS44MS44NGgtLjUzYS43NS43NSwwLDAsMS0uODQtLjg0VjM4LjM3YTcuMTQsNy4xNCwwLDAsMSwuMS0xLjI3SDEyNkE2LjI1LDYuMjUsMCwwLDEsMTIwLjMsNDFjLTIuODUsMC01LjctMS42Ny01LjctNC45MkMxMTQuNiwzMC41MywxMjEuNjQsMzAuMjMsMTI0Ljg5LDMwLjIzWk0xMjAuNywzOWMzLjI1LDAsNS4xNi0zLjM1LDUuMTYtNi4zdi0uOGgtLjk0Yy0yLjY1LDAtOCwuMS04LDMuODhDMTE2Ljk0LDM3LjQsMTE4LjE5LDM5LDEyMC43LDM5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjNmU2ZjcxIi8+PHBhdGggZD0iTTEzMS4zOSwyNC41M2EuNzYuNzYsMCwwLDEsLjg0LS44NGguNmEuNzUuNzUsMCwwLDEsLjguODR2MS45NGE1Ljc1LDUuNzUsMCwwLDEtLjEzLDEuMjFoLjA3YTcuMTUsNy4xNSwwLDAsMSw2LjItNC4zOWMzLjExLDAsNC43MiwxLjQ0LDUuMTksNC4yMkgxNDVhNy4xNiw3LjE2LDAsMCwxLDYuMi00LjIyYzQuMDksMCw1LjU5LDIuMzgsNS41OSw2LjUzdjkuODlhLjc2Ljc2LDAsMCwxLS44My44NGgtLjYxYS43Ni43NiwwLDAsMS0uODQtLjg0VjMwLjM5YzAtMi43NC0uNTYtNS0zLjYxLTUtMy4zOSwwLTUuNjcsMy41NS01LjY3LDd2Ny4zYS43My43MywwLDAsMS0uOC44NGgtLjY0YS43Ni43NiwwLDAsMS0uODQtLjg0VjMwLjM5YzAtMi41NC0uMzctNS0zLjU1LTUtMy40MiwwLTUuNzYsMy42Mi01Ljc2LDd2Ny4zYS43NC43NCwwLDAsMS0uODEuODRoLS42M2EuNzYuNzYsMCwwLDEtLjg0LS44NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjxwYXRoIGQ9Ik0xNjcuMjgsMjMuMjljNC40OSwwLDcsMy4yNSw3LDhhLjg0Ljg0LDAsMCwxLS44OC44NEgxNjEuMzFjLjEsNC4yOSwzLjA1LDYuNzQsNi41NCw2Ljc0YTcuMTcsNy4xNywwLDAsMCw0LjQyLTEuNTUuNy43LDAsMCwxLDEuMTEuMmwuMjcuNDFhLjc4Ljc4LDAsMCwxLS4yNCwxLjFBOS41MSw5LjUxLDAsMCwxLDE2Ny43OCw0MSw4LjUxLDguNTEsMCwwLDEsMTU5LDMyLjE0QzE1OSwyNi42MSwxNjIuNzIsMjMuMjksMTY3LjI4LDIzLjI5Wk0xNzIsMzAuNDZjLS4xNC0zLjU1LTIuMjgtNS4zLTQuOC01LjNhNS44Miw1LjgyLDAsMCwwLTUuOCw1LjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9IiM2ZTZmNzEiLz48cGF0aCBkPSJNMTg1LjE3LDIzLjI5YTguODQsOC44NCwwLDAsMSw1LjYsMS45MS43Mi43MiwwLDAsMSwuMSwxLjE0bC0uMjMuMzdjLS4zLjQ3LS42Ny40Ny0xLjE0LjE3YTcsNywwLDAsMC00LjI2LTEuNTUsNi41LDYuNSwwLDAsMC02LjU3LDYuODEsNi41LDYuNSwwLDAsMCw2LjYsNi43N0E3LjM1LDcuMzUsMCwwLDAsMTkwLDM3LjEzYS42Ny42NywwLDAsMSwxLjExLjJsLjIzLjM0YS44LjgsMCwwLDEtLjIsMS4xMyw5LjMyLDkuMzIsMCwwLDEtNiwyLjE1LDguNTMsOC41MywwLDAsMS04Ljg0LTguODFBOC41OSw4LjU5LDAsMCwxLDE4NS4xNywyMy4yOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjxwYXRoIGQ9Ik0xOTMuNjUsMTcuODNhLjczLjczLDAsMCwxLC44LS44NGguNjRhLjc2Ljc2LDAsMCwxLC44NC44NHY4LjQxYTcuMTgsNy4xOCwwLDAsMS0uMTMsMS4zN2guMDZhNy40Myw3LjQzLDAsMCwxLDYuNzQtNC4zMmM0LjE5LDAsNS42NiwyLjM4LDUuNjYsNi41M3Y5Ljg5YzAsLjU0LS4yNi44NC0uOC44NGgtLjY0YS43Ni43NiwwLDAsMS0uODQtLjg0VjMwLjQzYzAtMi42NS0uNC01LTMuNjgtNS0zLjU1LDAtNi4zNywyLjkyLTYuMzcsN3Y3LjNhLjc2Ljc2LDAsMCwxLS44NC44NGgtLjY0YS43My43MywwLDAsMS0uOC0uODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9IiM2ZTZmNzEiLz48cGF0aCBkPSJNMjE4Ljc1LDIzLjI5YzQuNDksMCw3LDMuMjUsNyw4YS44NC44NCwwLDAsMS0uODcuODRIMjEyLjc5Yy4xLDQuMjksMy4wNSw2Ljc0LDYuNTMsNi43NGE3LjIsNy4yLDAsMCwwLDQuNDMtMS41NS42OS42OSwwLDAsMSwxLjEuMmwuMjcuNDFhLjc4Ljc4LDAsMCwxLS4yMywxLjFBOS41Nyw5LjU3LDAsMCwxLDIxOS4yNiw0MWE4LjUyLDguNTIsMCwwLDEtOC44Mi04LjgxQzIxMC40NCwyNi42MSwyMTQuMTksMjMuMjksMjE4Ljc1LDIzLjI5Wm00LjczLDcuMTdjLS4xMy0zLjU1LTIuMjgtNS4zLTQuOC01LjNhNS44LDUuOCwwLDAsMC01Ljc5LDUuM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjxwYXRoIGQ9Ik0yMzcuMTIsMzAuMjNoMXYtLjU0YzAtMy4yNS0xLjc4LTQuMzYtNC4xNi00LjM2YTcuODUsNy44NSwwLDAsMC00LjA4LDEuMTguOC44LDAsMCwxLTEuMTQtLjI3bC0uMi0uMzRhLjc2Ljc2LDAsMCwxLC4yMy0xLjE0LDEwLjM0LDEwLjM0LDAsMCwxLDUuMzYtMS40N2M0LDAsNi4yNywyLjI0LDYuMjcsNi40N3YxMGEuNzQuNzQsMCwwLDEtLjgxLjg0SDIzOWEuNzUuNzUsMCwwLDEtLjg0LS44NFYzOC4zN2E3LjE0LDcuMTQsMCwwLDEsLjEtMS4yN2gtLjA3QTYuMjUsNi4yNSwwLDAsMSwyMzIuNTMsNDFjLTIuODUsMC01LjctMS42Ny01LjctNC45MkMyMjYuODMsMzAuNTMsMjMzLjg3LDMwLjIzLDIzNy4xMiwzMC4yM1pNMjMyLjkzLDM5YzMuMjUsMCw1LjE2LTMuMzUsNS4xNi02LjN2LS44aC0uOTRjLTIuNjUsMC04LC4xLTgsMy44OEMyMjkuMTcsMzcuNCwyMzAuNDEsMzksMjMyLjkzLDM5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjNmU2ZjcxIi8+PHBhdGggZD0iTTI0My42NSwyNC41M2EuNzQuNzQsMCwwLDEsLjgxLS44NEgyNDVhLjcyLjcyLDAsMCwxLC44MS43N3YxLjIxYTYsNiwwLDAsMS0uMSwxLjE0aC4wNmE2LjI4LDYuMjgsMCwwLDEsNS45LTMuNTJjNC41MywwLDcuMzQsMy42Miw3LjM0LDguODVTMjU1LjgyLDQxLDI1MS40Myw0MWE2LjEzLDYuMTMsMCwwLDEtNS41Ny0zLjQyaC0uMDZhNy44NCw3Ljg0LDAsMCwxLC4xMywxLjQ4djcuNGEuNzYuNzYsMCwwLDEtLjg0Ljg0aC0uNjNhLjc0Ljc0LDAsMCwxLS44MS0uODRabTcuNTQsMTQuMzhjMywwLDUuNDctMi40OCw1LjQ3LTYuNzcsMC00LjEzLTIuMjItNi43Ny01LjMzLTYuNzctMi44MiwwLTUuNDcsMi01LjQ3LDYuOEMyNDUuODYsMzUuNTUsMjQ3Ljc0LDM4LjkxLDI1MS4xOSwzOC45MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjwvc3ZnPgo=", link: "https://namecheap.com" },
];

export default function ClientMarquee() {
  return (
    <section className="w-full py-10 border-y border-outline/10 overflow-hidden relative z-10">
      {/* Giant Ambient "Sunlight" Orbs matching HeroSection */}
      <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[50vw] h-[50vw] max-w-150 max-h-150 bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-[0.05] blur-[80px] pointer-events-none -z-10 animate-pulse-glow"></div>
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[60vw] h-[60vw] max-w-200 max-h-200 bg-[radial-gradient(circle,var(--color-secondary)_0%,transparent_60%)] opacity-[0.04] blur-[100px] pointer-events-none -z-10" style={{ animation: 'pulse-slow-glow 10s ease-in-out infinite 3s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[30vw] bg-[radial-gradient(ellipse,var(--color-primary-container)_0%,transparent_70%)] opacity-[0.03] blur-[100px] pointer-events-none -z-10 rotate-[-15deg]"></div>
      
      {/* Subtle Glass Blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-surface/10 -z-10 pointer-events-none"></div>

      <div className="container px-4 sm:px-6 lg:px-12 mb-8 relative z-10">
        <p className="font-display text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold text-secondary/60 text-center">
          Trusted By & Associated Partners
        </p>
      </div>

      {/* 
        We remove the "container px-4" classes here so the slider goes full width edge-to-edge.
        This allows the mask-image to fade the logos smoothly at the extreme edges of the screen, 
        instead of hard-clipping them inside the container's padding!
      */}
      <div
        className="relative container w-full overflow-hidden group"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        <Splide
          options={{
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 5,
            arrows: false,
            pagination: false,
            gap: '2rem',
            autoScroll: {
              speed: 1,
              pauseOnHover: true,
              pauseOnFocus: false,
            },
            breakpoints: {
              1024: { perPage: 4 },
              768: { perPage: 3 },
              480: { perPage: 2 },
            }
          }}
          extensions={{ AutoScroll }}
          className="cursor-grab active:cursor-grabbing"
        >
          {clients.map((client) => (
            <SplideSlide key={client.id} className="flex items-center justify-center p-6">
              <Link
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/logo relative transition-all duration-300 inline-flex items-center justify-center w-full hover:-translate-y-1"
                aria-label={`Visit ${client.name}`}
              >
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="h-10 md:h-16 w-auto object-contain relative z-10 drop-shadow-sm group-hover/logo:drop-shadow-[0_0_20px_rgba(255,0,0,0.7)] transition-all duration-500"
                  loading="lazy"
                  draggable={false}
                />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
