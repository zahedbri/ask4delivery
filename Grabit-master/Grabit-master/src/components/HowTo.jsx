import React from 'react'
import scooter from '../img/scooter.svg'
import shop from '../img/shop.svg'
import pack from '../img/package.svg'

const HowTo = () => (
  <div className="how-to" id="how-to">
    <div className="container">
      <h2 className="how-to__title">How it works</h2>
      <div className="row margin-bottom">
        <div className="col-md-6 text-center order-md-last">
          <img src={shop} className="how-to__image" alt="shop" />
        </div>
        <div className="col-md-6">
          <h2 className="how-to__heading">
            We do more than
            <br /> delivery.
          </h2>
          <p className="how-to__paragraph">
            Stocking Your Restaurant Kitchen Finding Reliable Sellers Of Cookware In The Brick And
            Mortar World
          </p>
        </div>
      </div>
      <div className="row margin-bottom">
        <div className="col-md-6 text-center">
          <img src={scooter} className="how-to__image" alt="scooter" />
        </div>
        <div className="col-md-6">
          <h2 className="how-to__heading">
            Fast Delivery with
            <br /> tracking.
          </h2>
          <p className="how-to__paragraph">
            Breast Augmentation Breast Enlargement Medical Tourism In The Philippine.
          </p>
        </div>
      </div>
      <div className="row margin-bottom">
        <div className="col-md-6 text-center order-md-last">
          <img src={pack} className="how-to__image" alt="pack" />
        </div>
        <div className="col-md-6">
          <h2 className="how-to__heading">
            Stay at home we do it
            <br />
            for you.
          </h2>
          <p className="how-to__paragraph">
            Planning Helps Make A Party Perfect Keep Dinner Simple Heat Frozen Vegetables And
            Precooked Smoked Sausage Together For A Complete Meal
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default HowTo
