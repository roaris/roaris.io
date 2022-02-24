import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// RFC3339形式の公開日時(UTC)を変換する
export const parseTime = (publishedAt) => {
  publishedAt = dayjs
    .utc(publishedAt)
    .tz('Asia/Tokyo')
    .format('YYYY-MM-DD HH:mm');
  return publishedAt;
};
