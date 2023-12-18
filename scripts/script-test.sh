chunk="test"
path="feature/Module"
className="ChsPage"
cat << EOF >> file.tsx
export const ${className} = loadable(() => import(/* webpackChunkName: "${chunk}" */ '${path}'));
EOF