const vertexShaderSource = `#version 310 es

#define POSITION_LOCATION 0
        #define TEXCOORD_LOCATION 1

        precision highp float;
        precision highp int;

        layout(location = POSITION_LOCATION) in vec3 position;
        layout(location = TEXCOORD_LOCATION) in vec3 in_texcoord;

        // Output 3D texture coordinate after transformation
        out vec3 v_texcoord;

        // Matrix to transform the texture coordinates into 3D space
        uniform mat4 orientation;
        uniform mat4 proj;
        uniform mat4 MV;

        void main()
        {
        v_texcoord = in_texcoord.xyz;
        gl_Position = proj * MV * vec4(position.x * 10.0, position.y*10.0, position.z*10.0, 1.0);
        }

`
;

const fragmentShaderSource = `#version 310 es

        precision highp float;
        precision highp int;
        precision highp sampler3D;

        layout(binding = 0) uniform highp usampler3D volumeData;

        in vec3 v_texcoord;

        out vec4 color;

        void main()
        {

        uvec4 dat = texelFetch(volumeData, ivec3(v_texcoord * 256.0), 0);
        //     return uvec2((val & 4294901760u) >> 16, (val & 65535u));

        //uint nrtri = (dat.x & 4294901760u) >> 16u;
        //uint cubeindex = (dat.x & 65535u);

        //if (nrtri > 0u)
        //{
         //       color = vec4(cubeindex * 100000u, 0, 0, 1);
        //}
        //color = texture(volumeData, v_texcoord);
        color = vec4(dat.x * 10000u, 0, 0, 1);
        //color.xyz *= 5;
        //color = vec4(v_texcoord.x > 0.5f ? v_texcoord : vec3(0.5f), 1.0f);
        }
`
;
