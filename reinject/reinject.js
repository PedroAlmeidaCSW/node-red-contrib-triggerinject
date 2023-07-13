/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = function (RED) {
    function reinject(config) {
        RED.nodes.createNode(this, config);
        let context = this.context().flow;
        let node = this;
        context.set(node.id, "");
        node.on('input', function (msg) {
            try {
                const keys = Object.keys(msg);
                if (keys.length === 1) {
                    const savedMsg = context.get(node.id);
                } else {
                    context.set(node.id, msg);
                    node.send(msg);
                }
            } catch (error) {
                node.error(error, msg);
            }
        });
        node.on('close', function () {
            context.set(node.id, "");
        });
    }
    RED.nodes.registerType("reinject", reinject);
};
