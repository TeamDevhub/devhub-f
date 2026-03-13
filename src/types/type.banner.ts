import type {DateType} from "@/types/type.api.ts";

export interface BannerSearchRequest {
    publicationStartDate: DateType,
    publicationEndDate: DateType,
    alwaysPublication: string,
    used: string,
    keyword: string,
    bannerType: 'MAIN' | 'SUB',
}

export interface Banner {
    bannerGuid?: string,
    imageGuid: string,
    publicationStartDate: DateType,
    publicationEndDate: DateType,
    alwaysPublication: string,
    used: string,
    bannerType: 'MAIN' | 'SUB',
    description: string,
    title: string,
    link: string,
    registrantGuid?: string,
    registeredDate?: DateType,
    modifierGuid?: string,
    modifiedDate?: DateType,
}