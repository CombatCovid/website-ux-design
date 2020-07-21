<template>
  <Layout>
    <div class="formal-look">
      <h1 class="horiz-center">Early Release notes:</h1>
      <div class="page-width horiz-center">
        <div class="page-content">
          <p>
            Be sure to know that you're invited here on a working preview, fresh out of
            our latest design progress and rapid implementation, and that the same
            is true of the Design Documents you'll find and may use. </p>
          <p>All will
            increase and improve, yet in our present circumstances, surely it's best
            to get what is clearly useful out to be seen, into the earliest public view.
          </p>
          <p>
            The simple to use Finder in this app will you discover designs, by trying words
           that suggest your interest, then seeing candidates, each with an image and
            a brief description to help you get an idea about it.</p>
          <p>
            Tapping on a cards you see will bring up the Viewer on that design,
            where you'll have a quick Summary, and then be ready to tap or click again,
            into easy reading views over all Design visuals and text Documents.
          </p>
          <p>
            With a tablet or phone, you can just swipe left or right, in the usual way,
            to move rapidly through what's available -- or if you prefer, tap the
            arrow buttons that appear. On a laptop or other larger computer, you also can
            use your keyboard arrow buttons, and scroll right or left in a similar way.
          </p>
          <p>Being able to scan through designs means you'll be able
            to rapidly appreciate what the built result is actually going to be like,
            and that should help in coming to important judgements.
          </p>
          <p>
            Speed and ease, across culture, situations, and needs, are the things we are after.
          </p>
          <p>
            What will follow, for one example, as we integrate features,
            will include the ability to Bookmark the designs you want to
            be able to immediately return to, thus compare them quickly.</p>
          <p>We're looking forward to this -- and to just a few further things...</p>
          <p>Thank you for visiting, on our early days.</p>
          <p style="margin-left: 20px;"> -- the Combat Covid with Hardware team.</p>
        </div>
        <div class="page-content">
          <h2 id="impressum">Impressum</h2>
          <p>We are the Combat Covid with Hardware team, working internationally from
            North America, India, and Africa, and from the home of the project,
            Delft, The Netherlands, of the University environment and community there.</p>
          <p>Contact details and address: </p>
          <pre>
            Primary Contact/Project Leader:
              Jose Carlos Urra
              TU Delft Library
              Prometheusplein 1,
              2628 ZC Delft, The Netherlands
              email: combatcovid820@gmail.com
          </pre>

          <h3>Cookies Statement</h3>
          <p>
            We use no cookies at all. We use a small cache in
            persistent local storage to allow performance improvement,
            and possible future features like repository bookmarks.
          </p>
          <p>
            In none of these features is any data sent at all from
            your browser, and we do not ask for any personal information
            in any case, so privacy is assured.
          </p>
          <h3>We ask you to kindly read our Cautionary Statement:</h3>
          <p>
            Please be careful to note, that while building with 3D Printing can be fun
            and interesting certainly, medical equipment is a serious undertaking.</p>

          <p>We encourage you to take all care and caution to heart, and to work directly
            with the medical staff who will use what you make.</p>

          <p>A medical ventilator, for example, can be priceless when it is needed, but
            it is also potentially <i>very dangerous to the patient</i> if not mechanically precise,
            or if it is not set up and consistently monitored for them, with the care that
            only persons who have full skills and training in its use can give.</p>

          <p>The documents of the MIT Emergency Ventilator that you find here describe
            very well these concerns for its own case, and will also give you a very usable idea of
            what similar cautions and considerations you should look for, should actively seek out,
            for any of the designs.</p>

          <p>You'll see why you'll want and will need to get best and constant advice
            of those medical persons who will actually use your results, and
            according to conditions in the situation where you may wish to build them.</p>

          <p>It's our intention to become as useful as possible on capabilities
            and concerns, while you can see that the responsibility must remain
            with you who use the designs. You must do so properly and with informed due care, so that
            the best can come of your efforts, providing for others through making medical equipment.</p>

          <p>Thank you.</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>

<style scoped>

  /*
    This is the fix for universal offset problems with fixed menu bars
    and links to anchors, compliments of
    https://css-tricks.com/hash-tag-links-padding/#article-header-id-1

    It needs to be used on every page that can be called through anchors,
    within the scoped style block wherever one is used.
  */

  h1:before, h2:before, h3:before, h4:before {
    display: block;
    content: " ";
    /*margin-top: -20px;*/
    height: 20px;
    visibility: hidden;
    pointer-events: none;
  }

  @media only screen and (min-width: 961px) {
    h1:before, h2:before, h3:before, h4:before {
      display: block;
      content: " ";
      margin-top: -82px;
      height: 82px;
      visibility: hidden;
      pointer-events: none;
    }
  }

  /*end linked anchor fix*/

  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }
  .page-width {
    max-width: 920px;
    margin: 10px;
  }
  .page-content {
    margin: 10px auto;
    text-align: left;
  }
  .design-image {
    width: 100%;
  }
  .design-image-hold {
    margin: 3% auto;
  }
  .doc-title {
    padding: 0 20px 20px 20px;
  }
  .formal-look {
    color: #1d5c87;
    font-family: Roboto, sans-serif;
    font-size: small;
    padding: 20px;
    max-width: 640px;
    box-sizing: content-box;
    margin: 20px auto;
    color: darkslategray;
    background-color: beige;
  }

</style>
