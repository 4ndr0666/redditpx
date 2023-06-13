import type { VercelRequest, VercelResponse } from '@vercel/node';

import fetch from 'node-fetch';

let COUNT = 500

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {

  let apiurl
  https://kpfarchive.com/api/posts?deleted=&from=&page=1&s=&sort=&to=&type=&username=

  apiurl = `https://kpfarchive.com/api/posts?page=1`

  await fetch_and_respond(request, response, apiurl)
}

async function fetch_and_respond(request: VercelRequest, response: VercelResponse, apiurl: string) {

  const r = await fetch(apiurl)
  const json: any = await r.json()
  console.log(json)

  const urls = json.map((x) => x.url) // Using gfyName instead of gfyId so that we can avoid an api call from the frontend
  const items = json

  items.forEach((i) => {
    i.thumb = `https://m.kpfarchive.com/k/i/${i.thumb}`
  })


  const cursor = encodeURIComponent(json.cursor)

  if (request.query.jsonp) {
    response.status(200).send(
      request.query.jsonp + '(' + JSON.stringify(mkresponse(urls, items, cursor)) + ')'
    )
    return
  }
  response.status(200).json(mkresponse(urls, items, cursor))

}


function mkresponse(urls: string[], items: any[], cursor: string) {

  return {
    kind: "Listing",
    data: {
      after: cursor,
      children: urls.map((x, i) => mkdataitem(x, items[i]))
    }
  }

}

function mkdataitem(url, item) {

  return {
    kind: "t3",
    data: {
      "approved_at_utc": null,
      "subreddit": "gfycat",
      "selftext": "",
      "author_fullname": 'kpfarchive',
      "saved": false,
      "mod_reason_title": null,
      "gilded": 0,
      "clicked": false,
      "title": item.title,
      "link_flair_richtext": [],
      "subreddit_name_prefixed": `u/kpfarchive`,
      "hidden": false,
      "pwls": 0,
      "link_flair_css_class": null,
      "downs": 0,
      "thumbnail_height": 140,
      "top_awarded_type": null,
      "hide_score": false,
      "name": "gfycatname",
      "quarantine": false,
      "link_flair_text_color": "dark",
      "upvote_ratio": 0.98,
      "author_flair_background_color": null,
      "subreddit_type": "public",
      "ups": 1131,
      "total_awards_received": 0,
      "thumbnail_width": 140,
      "author_flair_template_id": "02666ee0-e0ea-11e4-9cf7-22000b280e28",
      "is_original_content": false,
      "user_reports": [],
      "is_reddit_media_domain": false,
      "is_meta": false,
      "category": null,
      "link_flair_text": null,
      "can_mod_post": false,
      "score": 1131,
      "approved_by": null,
      "is_created_from_ads_ui": false,
      "author_premium": true,
      "thumbnail": item.thumb,
      "edited": false,
      "gildings": {},
      "post_hint": "rich:video",
      "content_categories": null,
      "is_self": false,
      "mod_note": null,
      "created": 1677277233.0,
      "link_flair_type": "text",
      "wls": 0,
      "removed_by_category": null,
      "banned_by": null,
      "author_flair_type": "richtext",
      "domain": item.domain,
      "allow_live_comments": false,
      "selftext_html": null,
      "likes": null,
      "suggested_sort": null,
      "banned_at_utc": null,
      "url_overridden_by_dest": url,
      "view_count": null,
      "archived": false,
      "no_follow": false,
      "is_crosspostable": false,
      "pinned": false,
      "over_18": true,
      "preview": {
        "images": [
          {
            "source": {
              "url": item.thumb,
              "width": '',
              "height": '',
            },
            "resolutions":
              [
                {
                  "url": item.thumb,
                  "width": '',
                  "height": ''
                }
              ],
            "id": "548lbOuX-C9g1j7YAbF4UdfCYsUick-Sa_79SswedVE"
          }
        ],
        "enabled": false
      },
      "all_awardings": [],
      "awarders": [],
      "media_only": false,
      "can_gild": false,
      "spoiler": false,
      "locked": false,
      "author_flair_text": "Gfycat author flair text",
      "treatment_tags": [],
      "visited": false,
      "removed_by": null,
      "num_reports": null,
      "distinguished": null,
      "subreddit_id": "gfycat",
      "author_is_blocked": false,
      "mod_reason_by": null,
      "removal_reason": null,
      "link_flair_background_color": "",
      "id": url,
      "is_robot_indexable": true,
      "report_reasons": null,
      "author": 'kpfarchive',
      "discussion_type": null,
      "num_comments": 42,
      "send_replies": true,
      "whitelist_status": "no_ads",
      "contest_mode": false,
      "mod_reports": [],
      "author_patreon_flair": false,
      "author_flair_text_color": "dark",
      "permalink": item.permalink,
      "parent_whitelist_status": "no_ads",
      "stickied": false,
      "url": url,
      "subreddit_subscribers": 325880,
      "created_utc": 1677277233.0,
      "num_crossposts": 1,
      "is_video": item.url.endsWith('gifv')
    }
  }

}
