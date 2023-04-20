export interface LoginResponse {
    accessToken: string | null,
    userFullName: string | null,
    role: string,
    authorities: [] | null,
    accountSettingsResponse: null
}
