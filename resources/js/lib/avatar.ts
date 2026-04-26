export const DEFAULT_AVATAR = '/assets/avater.webp';

export function avatarSrc(avatar?: string | null) {
    return avatar || DEFAULT_AVATAR;
}
