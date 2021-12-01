
/**
 * 対象の文字列を分割して配列で返す(エスケープ済みの文字列はそのまま)
 * @param str 
 */
export default function messageSplit(str: string):string[] {
	return str.split(/(&.+?;)/).map(v => {
		return v.match(/(&.+?;)/) ? v : v.split('');
	}).flat();
}



