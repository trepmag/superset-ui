/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
const mxsdk = require('@fxi/mxsdk/dist/mxsdk.umd.js');
import './MapX.css';

export type MapXChartProps = {
  height: string;
  width: string;
  data: { x: number; y: number }[];
  project: string;
};

export default class MapX extends React.PureComponent<MapXChartProps> {
  sdkManager: any;
  container: HTMLElement | null;
  constructor(props: MapXChartProps) {
    super(props);
    this.container = null;
  }

  componentDidMount() {
    const { project, height } = this.props;
    this.sdkManager = new mxsdk.Manager({
      container: this.container,
      url: `https://app.staging.mapx.org/?project=${project}&language=en`,
      style: {
        width: '100%',
        height: height + 'px',
        backgroundColor: '#474747',
        resize: 'both',
        border: 'none',
        maxHeight: '100%',
        maxWidth: '100%',
      },
    });

    this.sdkManager.on('ready', () => {
      // /**
      //  * Hide views panel
      //  */
      // this.sdk.ask('set_panel_left_visibility', {
      //   panel: 'views',
      //   show: false,
      // });
      //
      // this.sdk.ask('get_projects').then((p: Array<Object>) => {
      //   console.log('======');
      //   console.log(p);
      // });

      Promise.all([this.sdkManager.ask('get_project'), this.sdkManager.ask('get_views')]).then(
        values => {
          console.log('MapX sdk: project and views available...');
        },
      );
    });
  }

  render() {
    const { project } = this.props;
    if (this.sdkManager) {
      this.sdkManager.ask('set_project', { idProject: project });
    }
    return (
      <div className="mapx-wrapper">
        <div ref={el => (this.container = el)} />
      </div>
    );
  }
}

export function getMapX() {
  return MapX;
}
