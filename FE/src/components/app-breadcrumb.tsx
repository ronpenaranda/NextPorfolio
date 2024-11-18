'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { SidebarTrigger } from "./ui/sidebar" 
  
  export function BreadcrumbDemo() {
    const pathname = usePathname();
    const path = pathname.split('/');

    console.log(path)

    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbMap: Record<string, string> = {
      projects: 'Projects',
      'weather-app': 'Weather App',
    };

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
              <SidebarTrigger/>
          </BreadcrumbItem>
          <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');

          return (
            <li className="breadcrumb-item" key={href}>
              <Link href={href}>{breadcrumbMap[segment] || segment}</Link>
            </li>
          );
        })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  